import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { ValidatedForm, validationError } from "remix-validated-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { experiences } from "~/db.server";
import { validator } from "./_index";

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
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

export const action = async ({ request, context, params }: ActionFunctionArgs) => {
  const { id } = params;
  if (!id) {
    throw new Response("Missing id", { status: 404 });
  }
  const fieldValues = await validator.validate(await request.formData());
  if (fieldValues.error) return validationError(fieldValues.error);

  const {
    data: { effects, rating, strain, description, image },
  } = fieldValues;

  const db = drizzle(context.cloudflare.env.DB);
  const effectsAsArray = effects.split(",").map((effect) => effect.trim());

  if (rating !== "1" && rating !== "2" && rating !== "3" && rating !== "4" && rating !== "5") {
    throw new Response("Invalid rating", { status: 400 });
  }

  const result = await db
    .update(experiences)
    .set({
      effects: effectsAsArray,
      strain,
      rating,
      description,
      image,
    })
    .where(eq(experiences.id, parseInt(id)))
    .returning({ id: experiences.id });

  return redirect(`/strains/${result[0].id}`);
};

const UpdatePage = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <ValidatedForm
      className="container mx-auto flex flex-col gap-4"
      method="POST"
      validator={validator}
    >
      <Label htmlFor="strain">Strain</Label>
      <Input defaultValue={data.strain} name="strain" type="text" />
      <Label htmlFor="effects">Effects</Label>
      <Input defaultValue={data.effects} name="effects" type="text" />
      <Label htmlFor="rating">Rating</Label>
      <Input defaultValue={data.rating} name="rating" type="number" />

      <Label htmlFor="image">Image</Label>
      <Input defaultValue={data.image ?? ""} name="image" type="text" />

      <Label htmlFor="description">Description</Label>
      <Input defaultValue={data.description ?? ""} name="description" type="text" />
      <div className="flex gap-4">
        <Button type="submit">Update</Button>
        <Button variant="destructive" asChild>
          <Link to={`/strains/${data.id}`}>Cancel</Link>
        </Button>
      </div>
    </ValidatedForm>
  );
};

export default UpdatePage;
