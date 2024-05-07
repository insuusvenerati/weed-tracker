import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { drizzle } from "drizzle-orm/d1";
import { Tracker } from "~/components/tracker";
import { experiences } from "~/db.server";

export const meta: MetaFunction = () => {
  return [{ title: "Weed Tracker" }, { name: "description", content: "Track your weed-sperience" }];
};

export const action = async ({ context, request }: ActionFunctionArgs) => {
  const db = drizzle(context.cloudflare.env.DB);
  const formData = await request.formData();
  const effectsAsArray = (formData.get("effects") as string)
    .split(",")
    .map((effect) => effect.trim());

  const result = await db.insert(experiences).values({
    effects: effectsAsArray,
    strain: formData.get("strain") as string,
    rating: formData.get("rating") as string,
    createdAt: new Date().toISOString(),
  });

  return json(result);
};

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const { env } = context.cloudflare;
  const db = drizzle(env.DB);
  const result = await db.select().from(experiences).all();

  return json(result);
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto">
      <Tracker rows={data} />
    </div>
  );
}
