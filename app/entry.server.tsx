import * as Sentry from "@sentry/remix";
import { RemixServer } from "@remix-run/react";
import type { AppLoadContext, EntryContext } from "@remix-run/cloudflare";
import { renderToReadableStream } from "react-dom/server";
import { isbot } from "isbot";

export function handleError(error, { request }) {
  Sentry.captureRemixServerException(error, "remix.server", request);
}

Sentry.init({
  dsn: "https://8fb93ae92312126a35f09324bfc3ec3e@o122225.ingest.us.sentry.io/4507198521540608",
  tracesSampleRate: 1,
});

export default async function (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadContext: AppLoadContext,
) {
  const body = await renderToReadableStream(
    <RemixServer context={remixContext} url={request.url} />,
    {
      signal: request.signal,
      onError(error: unknown) {
        // Log streaming rendering errors from inside the shell
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get("user-agent") || "")) {
    await body.allReady;
  }

  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
