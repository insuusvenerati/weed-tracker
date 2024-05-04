import { SignIn } from "@clerk/remix";

export default function SignInPage() {
  return (
    <main className="container mx-auto">
      <SignIn />
    </main>
  );
}
