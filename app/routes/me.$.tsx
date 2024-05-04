import { useUser } from "@clerk/remix";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function AccountPage() {
  const user = useUser();

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1 px-4 py-12 md:px-6">
        <div className="container mx-auto max-w-3xl space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Email</CardTitle>
              <CardDescription>Update your email address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  defaultValue={user.user?.emailAddresses[0].emailAddress}
                  id="email"
                  type="email"
                />
              </div>
              <Button className="w-full">Update Email</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <Button className="w-full">Change Password</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Phone Number</CardTitle>
              <CardDescription>Update your phone number</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input defaultValue="+1 (555) 555-5555" id="phone" type="tel" />
              </div>
              <Button className="w-full">Update Phone Number</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Delete Account</CardTitle>
              <CardDescription>
                Deleting your account is a permanent action and cannot be undone.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-500 dark:text-gray-400">
                If you&apos;re sure you want to delete your account, click the button below.
              </p>
              <Button className="w-full" variant="destructive">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
