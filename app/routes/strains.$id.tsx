import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/cloudflare";
import { useLoaderData, useRouteError } from "@remix-run/react";
import { captureRemixErrorBoundaryError } from "@sentry/remix";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Details } from "~/components/details";
import { CustomErrorBoundary } from "~/components/error-boundary";
import { experiences } from "~/db.server";

export const meta: MetaFunction<typeof loader> = ({ data }) => [{ title: data?.strain }];

export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  const { id } = params;
  const db = drizzle(context.cloudflare.env.DB);

  if (!id) {
    throw new Response("Missing id", { status: 404 });
  }

  const result = await db
    .select()
    .from(experiences)
    .where(eq(experiences.id, parseInt(id)));

  return json(result[0]);
};

const DetailsPage = () => {
  const data = useLoaderData<typeof loader>();

  console.log(data);
  return (
    <div>
      <Details {...data} />
    </div>
  );
};

export default DetailsPage;

export const ErrorBoundary = () => {
  const error = useRouteError();
  console.error(error);
  captureRemixErrorBoundaryError(error);

  return (
    <div>
      <CustomErrorBoundary />
    </div>
  );
};
