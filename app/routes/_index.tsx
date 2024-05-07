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
import { Tracker } from "~/components/tracker";
import { experiences } from "~/db.server";

export const meta: MetaFunction = () => {
  return [{ title: "Weed Tracker" }, { name: "description", content: "Track your weed-sperience" }];
};

export const action = async ({ context, request, params }: ActionFunctionArgs) => {
  const { userId } = await getAuth({ context, params, request });

  if (!userId) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const db = drizzle(context.cloudflare.env.DB);
  const formData = await request.formData();
  const rating = formData.get("rating");
  const effectsAsArray = (formData.get("effects") as string)
    .split(",")
    .map((effect) => effect.trim());

  // Surely there is a better way
  // and don't call me Shirley
  if (rating !== "1" && rating !== "2" && rating !== "3" && rating !== "4" && rating !== "5") {
    throw new Response("Invalid rating", { status: 400 });
  }

  const result = await db.insert(experiences).values({
    effects: effectsAsArray,
    strain: formData.get("strain") as string,
    rating: rating,
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
    <div className="container mx-auto">
      <SignedOut>
        <div className="flex h-full flex-col items-center justify-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Weed Tracker</h1>
          <p className="text-gray-500 dark:text-gray-400">Track your weed-sperience</p>
        </div>
      </SignedOut>
      <SignedIn>
        <Tracker rows={data} />
      </SignedIn>
    </div>
  );
}

export const ErrorBoundary = () => {
  const error = useRouteError();
  captureRemixErrorBoundaryError(error);
  return <CustomErrorBoundary />;
};
