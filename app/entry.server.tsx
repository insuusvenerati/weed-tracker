import * as Sentry from "@sentry/remix";
import { RemixServer } from "@remix-run/react";
import { handleRequest, type EntryContext } from "@vercel/remix";

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
) {
  const remixServer = <RemixServer context={remixContext} url={request.url} />;
  return handleRequest(request, responseStatusCode, responseHeaders, remixServer);
}
