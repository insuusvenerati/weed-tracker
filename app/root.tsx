import { ClerkApp } from "@clerk/remix";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { captureRemixErrorBoundaryError } from "@sentry/remix";
import clsx from "clsx";
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes";
import stylesheet from "~/globals.css?url";
import { Navbar } from "./components/navbar";
import { themeSessionResolver } from "./session.server";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesheet }];

export const loader = (args: LoaderFunctionArgs) => {
  return rootAuthLoader(args, async ({ request }) => {
    const { getTheme } = await themeSessionResolver(request);
    return {
      theme: getTheme(),
    };
  });
};

// export function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <Meta />
//         <Links />
//       </head>
//       <body>
//         {children}
//         <ScrollRestoration />
//         <Scripts />
//       </body>
//     </html>
//   );
// }

export const ErrorBoundary = () => {
  const error = useRouteError();
  captureRemixErrorBoundaryError(error);
  return <div>Something went wrong</div>;
};

export function App() {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();
  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body>
        <Navbar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  );
}

export default ClerkApp(AppWithProviders);
