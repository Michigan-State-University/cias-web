const DEFAULT_TIMEOUT_MS = 120000;
const POLL_INTERVAL_MS = 5000;
const PROBE_TIMEOUT_MS = 10000;

export const waitForApiHealthy = async (timeout = DEFAULT_TIMEOUT_MS): Promise<void> => {
  const apiUrl = process.env.API_URL;
  if (!apiUrl) return;

  const pingUrl = `${apiUrl.replace(/\/$/, '')}/v1/auth/ping`;
  const deadline = Date.now() + timeout;
  let lastResult = '';

  for (;;) {
    try {
      const response = await fetch(pingUrl, { signal: AbortSignal.timeout(PROBE_TIMEOUT_MS) });
      // Without a token the ping answers 401, which still means the API is up
      if (response.status < 500) return;
      lastResult = `HTTP ${response.status}`;
    } catch (error) {
      lastResult = error instanceof Error ? error.message : String(error);
    }

    if (Date.now() + POLL_INTERVAL_MS > deadline) {
      throw new Error(
        `Staging API unavailable: ${pingUrl} did not recover within ${timeout / 1000}s (last: ${lastResult})`,
      );
    }
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
  }
};
