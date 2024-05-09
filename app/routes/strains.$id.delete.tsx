import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { experiences } from "~/db.server";

export const action = async ({ params, context }: ActionFunctionArgs) => {
  const { id } = params;
  console.log("action");
  if (!id) throw new Response("Missing id", { status: 404 });
  const db = drizzle(context.cloudflare.env.DB);

  await db.delete(experiences).where(eq(experiences.id, parseInt(id)));

  return redirect("/");
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return { id: params.id };
};

const DeletePage = () => {
  const data = useLoaderData<typeof loader>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Link to={`/strains/${data.id}`}>Cancel</Link>
          </AlertDialogCancel>
          <Form method="POST">
            <input type="hidden" name="_method" value="delete" />
            {/* <AlertDialogAction asChild> */}
            <Button type="submit" variant="destructive">
              Continue
            </Button>
          </Form>
          {/* </AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePage;
