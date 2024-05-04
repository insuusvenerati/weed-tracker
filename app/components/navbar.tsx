import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/remix";
import { Link } from "@remix-run/react";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <header className="flex items-center justify-between bg-stone-100 px-4 py-3">
      <Link className="flex items-center gap-2" to="#">
        <span className="text-lg font-semibold">Weed Tracker</span>
      </Link>
      <div className="flex items-center gap-4">
        <SignedIn>
          <div className="flex items-center gap-4">
            <p>View your profile here 👇</p>
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
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
