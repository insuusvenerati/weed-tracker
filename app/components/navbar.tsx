import { SignInButton, SignOutButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/remix";
import { Link } from "@remix-run/react";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <header className="flex items-center justify-between bg-gray-900 px-4 py-3 text-gray-50 dark:bg-gray-950 dark:text-gray-50">
      <Link className="flex items-center gap-2" to="#">
        <span className="text-lg font-semibold">Weed Tracker</span>
      </Link>
      <Link
        className="inline-flex items-center justify-center rounded-md bg-gray-50 px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700 dark:focus-visible:ring-gray-300"
        to="#"
      >
        Get Support
      </Link>
      <div className="flex gap-4 items-center">

      <SignedIn>
        <p>You are signed in!</p>
        <div>
          <p>View your profile here 👇</p>
          <UserButton />
        </div>
        <div>
          <SignOutButton>
            <Button>Sign out</Button>
          </SignOutButton>
        </div>
      </SignedIn>
      <SignedOut>
        <p>You are signed out</p>
        <div>
          <SignInButton>
            <Button>Sign In</Button>
          </SignInButton>
        </div>
        <div>
          <SignUpButton>
            <Button>Sign Up</Button>
          </SignUpButton>
        </div>
      </SignedOut>
      </div>
    </header>
  );
}
