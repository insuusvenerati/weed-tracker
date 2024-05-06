import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import type { MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { drizzle } from "drizzle-orm/d1";
import { Tracker } from "~/components/tracker";
import { Button } from "~/components/ui/button";
import { experiences } from "~/db.server";

export const meta: MetaFunction = () => {
  return [{ title: "Weed Tracker" }, { name: "description", content: "Track your weed-sperience" }];
};

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const { env } = context.cloudflare;
  const db = drizzle(env.DB);
  const result = await db.select().from(experiences).all();

  return json(result);
};

export const action = async ({ context }: ActionFunctionArgs) => {
  const db = drizzle(context.cloudflare.env.DB);

  const result = await db.insert(experiences).values({
    effects: ["Happy", "Energetic", "Uplifted"],
    rating: "3",
    strain: "Sour Diesel",
  });
  
  return json(result)
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  console.log(data);
  return (
    <div className="container mx-auto">
      <Tracker rows={data} />
      <Form action="/?index" method="post">
        <Button type="submit">Add data</Button>
      </Form>
    </div>
  );
}
