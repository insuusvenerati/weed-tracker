import { Button } from "~/components/ui/button";

export function CustomErrorBoundary() {
  return (
    <div>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col items-center justify-center gap-6 bg-gray-100/40 p-4 dark:bg-gray-800/40">
        <div className="max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <TriangleAlertIcon className="h-12 w-12 text-red-500" />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Oops, something went wrong!</h2>
              <p className="text-gray-500 dark:text-gray-400">
                We&apos;re sorry, but an unexpected error has occurred. Please try reloading the
                page.
              </p>
            </div>
            <Button className="w-full max-w-[200px]">Reload</Button>
          </div>
        </div>
      </main>
    </div>
  );
}

function TriangleAlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
