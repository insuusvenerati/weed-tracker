import { SignedIn, SignedOut } from "@clerk/remix";
import { getAuth } from "@clerk/remix/ssr.server";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import type { MetaFunction } from "@remix-run/node";
import { useLoaderData, useRouteError } from "@remix-run/react";
import { captureRemixErrorBoundaryError } from "@sentry/remix";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { CustomErrorBoundary } from "~/components/error-boundary";
import { Hero } from "~/components/hero";
import { Tracker } from "~/components/tracker";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { experiences } from "~/db.server";
import { z } from "zod";
import { withZod } from "@remix-validated-form/with-zod";
import { validationError } from "remix-validated-form";

export const meta: MetaFunction = () => {
  return [{ title: "Weed Tracker" }, { name: "description", content: "Track your weed-sperience" }];
};

export const validator = withZod(
  z.object({
    strain: z.string().min(1),
    effects: z.string().min(1),
    rating: z.string().min(1),
  }),
);

export const action = async ({ context, request, params }: ActionFunctionArgs) => {
  const { userId } = await getAuth({ context, params, request });
  const fieldValues = await validator.validate(await request.formData());
  if (fieldValues.error) return validationError(fieldValues.error);

  const {
    data: { effects, rating, strain },
  } = fieldValues;

  if (!userId) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const db = drizzle(context.cloudflare.env.DB);

  const effectsAsArray = effects.split(",").map((effect) => effect.trim());

  if (rating !== "1" && rating !== "2" && rating !== "3" && rating !== "4" && rating !== "5") {
    throw new Response("Invalid rating", { status: 400 });
  }

  // if (action === "edit") {
  //   if (!id) {
  //     throw new Response("Missing id", { status: 400 });
  //   }

  //   const result = await db
  //     .update(experiences)
  //     .set({
  //       effects: effectsAsArray,
  //       strain,
  //       rating,
  //     })
  //     .where(eq(experiences.id, parseInt(id)));

  //   return json(result);
  // }

  // Surely there is a better way
  // and don't call me Shirley

  const result = await db.insert(experiences).values({
    effects: effectsAsArray,
    strain,
    rating,
    createdAt: new Date().toISOString(),
    userId,
  });

  return json(result);
};

export const loader = async ({ context, params, request }: LoaderFunctionArgs) => {
  const { userId } = await getAuth({ context, params, request });

  if (!userId) {
    return null;
  }

  const { env } = context.cloudflare;
  const db = drizzle(env.DB);
  const result = await db.select().from(experiences).where(eq(experiences.userId, userId));

  return json(result);
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <SignedOut>
        <Hero />
      </SignedOut>
      <SignedIn>
        <div className="container mx-auto py-4">
          <Alert>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              Some functionality is unfinished. Delete and Edit buttons currently not working
            </AlertDescription>
          </Alert>
        </div>
        <Tracker rows={data} />
      </SignedIn>
    </>
  );
}

export const ErrorBoundary = () => {
  const error = useRouteError();
  console.error(error);
  captureRemixErrorBoundaryError(error);
  return <CustomErrorBoundary />;
};
