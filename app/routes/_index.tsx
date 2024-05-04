import { SignInButton, SignOutButton } from "@clerk/remix";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Weed Tracker" }, { name: "description", content: "Track your weed-sperience" }];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <SignInButton>Sign In</SignInButton>
      <SignOutButton>Sign Out</SignOutButton>
    </div>
  );
}
