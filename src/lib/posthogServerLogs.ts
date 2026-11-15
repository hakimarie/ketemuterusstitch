import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";

type LogAttributes = Record<string, string | number | boolean>;

type ServerLogCapture = {
  emit: (body: string, attributes?: LogAttributes) => void;
  shutdown: () => Promise<void>;
};

const noopLogCapture: ServerLogCapture = {
  emit: () => undefined,
  shutdown: async () => undefined,
};

export function createPostHogServerLogs(): ServerLogCapture {
  const posthogKey = process.env.VITE_POSTHOG_KEY;
  const posthogHost = process.env.VITE_POSTHOG_HOST;

  if (!posthogKey || !posthogHost) {
    if (process.env.NODE_ENV !== "production") {
      const missingVariable = posthogKey ? "VITE_POSTHOG_HOST" : "VITE_POSTHOG_KEY";
      console.warn(
        `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`,
      );
    }
    return noopLogCapture;
  }

  const provider = new LoggerProvider({
    resource: resourceFromAttributes({
      "service.name": "ketemuterus-api",
      "deployment.environment": process.env.NODE_ENV ?? "development",
    }),
    processors: [
      new BatchLogRecordProcessor({
        exporter: new OTLPLogExporter({
          url: new URL("i/v1/logs", `${posthogHost}/`).toString(),
          headers: { Authorization: `Bearer ${posthogKey}` },
        }),
      }),
    ],
  });
  const logger = provider.getLogger("ketemuterus-posthog-logs");

  return {
    emit: (body, attributes) => {
      logger.emit({ severityText: "info", body, attributes });
    },
    shutdown: () => Promise.race([
      provider.shutdown(),
      new Promise<void>((resolve) => setTimeout(resolve, 3000)),
    ]),
  };
}
