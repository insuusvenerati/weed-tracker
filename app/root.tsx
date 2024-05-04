import { captureRemixErrorBoundaryError } from "@sentry/remix";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import stylesheet from "~/globals.css?url";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import { ClerkApp } from "@clerk/remix";
import { Navbar } from "./components/navbar";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesheet }];

export const loader = (args: LoaderFunctionArgs) => rootAuthLoader(args);

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const ErrorBoundary = () => {
  const error = useRouteError();
  captureRemixErrorBoundaryError(error);
  return <div>Something went wrong</div>;
};

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default ClerkApp(App);
