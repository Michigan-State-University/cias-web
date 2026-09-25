import { spawn } from 'child_process';
import fs from 'fs';
import net from 'net';

export type AppServer = { url: string; stop: () => void };

export const portInUse = (port: number): Promise<boolean> =>
  new Promise((resolve) => {
    const socket = net.connect({ port, host: '127.0.0.1' });
    socket.once('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.once('error', () => resolve(false));
  });

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const startAppServer = async (options: {
  cwd: string;
  port: number;
  env: NodeJS.ProcessEnv;
  timeoutMinutes: number;
  logFile: string;
}): Promise<AppServer> => {
  const { cwd, port, env, timeoutMinutes, logFile } = options;
  if (await portInUse(port)) {
    throw new Error(
      `port ${port} is in use. Stop the server on it — the pipeline serves the code under test itself — or change server.port in pipeline.config.json.`,
    );
  }

  // The dev server even in CI: only it rebuilds when codegen adds data-cy attributes.
  const log = fs.openSync(logFile, 'a');
  const child = spawn('npm', ['run', 'start'], {
    cwd,
    env: { ...env, PORT: String(port) },
    detached: true,
    stdio: ['ignore', log, log],
  });
  const stop = () => {
    try {
      if (child.pid) process.kill(-child.pid, 'SIGTERM');
    } catch {
      // Already gone.
    }
  };

  const url = `http://localhost:${port}`;
  const deadline = Date.now() + timeoutMinutes * 60_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(
        `the app server exited with ${child.exitCode} — see ${logFile}`,
      );
    }
    try {
      if ((await fetch(url)).ok) return { url, stop };
    } catch {
      // Not listening yet.
    }
    await sleep(3000);
  }
  stop();
  throw new Error(
    `the app server didn't answer on ${url} within ${timeoutMinutes} min — see ${logFile}`,
  );
};
