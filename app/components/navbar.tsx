import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/remix";
import { Link } from "@remix-run/react";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <header className="flex items-center justify-between bg-gray-900 px-4 py-3 text-gray-50 dark:bg-gray-950 dark:text-gray-50">
      <Link className="flex items-center gap-2" to="#">
        <span className="text-lg font-semibold">Weed Tracker</span>
      </Link>
      <div className="flex items-center gap-4">
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
