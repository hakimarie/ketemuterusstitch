import { createNoopLogger, type Logger } from "@opentelemetry/api-logs";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";

let logProvider: LoggerProvider | undefined;

function createPostHogLogger(): Logger {
  const apiKey = process.env.VITE_POSTHOG_KEY;
  const apiHost = process.env.VITE_POSTHOG_HOST;

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("VITE_POSTHOG_KEY variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_POSTHOG_KEY is configured");
    }
    return createNoopLogger();
  }

  if (!apiHost) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("VITE_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_POSTHOG_HOST is configured");
    }
    return createNoopLogger();
  }

  const exporter = new OTLPLogExporter({
    url: new URL("/i/v1/logs", apiHost).toString(),
    headers: { Authorization: `Bearer ${apiKey}` },
    timeoutMillis: 3000,
  });

  logProvider = new LoggerProvider({
    resource: resourceFromAttributes({
      "service.name": "ketemuterus-api",
      "deployment.environment": process.env.NODE_ENV ?? "development",
    }),
    processors: [new BatchLogRecordProcessor({ exporter })],
  });

  return logProvider.getLogger("ketemuterus.posthog");
}

export const posthogLogger = createPostHogLogger();

export async function shutdownPostHogLogs() {
  if (!logProvider) return;

  try {
    await logProvider.shutdown();
  } catch (error) {
    console.warn("PostHog log exporter shutdown failed:", error);
  }
}
