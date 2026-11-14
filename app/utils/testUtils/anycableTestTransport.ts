import type { Transport, TransportEvents } from '@anycable/core/transport';

type Events = TransportEvents<string>;
type Listener = (...args: any[]) => void;

/**
 * In-memory stand-in for AnyCable's WebSocket transport.
 *
 * `@anycable/core` ships an equivalent `TestTransport`, but it is raw,
 * uncompiled TypeScript that is not listed in the package's `exports` map, so
 * it cannot be imported. (`@anycable/core/testing` *is* exported, but it holds
 * `TestCable`, a fake Cable with no `subscribeTo` — it cannot stand in here.)
 * This is a local equivalent: it lets tests drive the real `createCable` /
 * `Channel` code in jsdom without opening a socket.
 *
 * `sent` collects every frame the client wrote; `receive` pushes a frame from
 * the "server" back into the cable.
 */
export class AnycableTestTransport implements Transport<string> {
  url: string;

  opened: boolean;

  sent: string[];

  private listeners: Map<string, Listener[]>;

  private params: Record<string, string>;

  constructor(url = 'ws://localhost/cable') {
    this.url = url;
    this.opened = false;
    this.sent = [];
    this.listeners = new Map();
    this.params = {};
  }

  displayName() {
    return `AnycableTestTransport(${this.url})`;
  }

  setURL(url: string) {
    this.url = url;
  }

  setParam(key: string, value: string) {
    this.params[key] = value;
  }

  setToken(value: string, param = 'jid') {
    this.params[param] = value;
  }

  open() {
    this.opened = true;
    this.emit('open');
    return Promise.resolve();
  }

  send(data: string) {
    this.sent.push(data);
  }

  close() {
    this.opened = false;
    this.emit('close');
    return Promise.resolve();
  }

  on<E extends keyof Events>(event: E, callback: Events[E]) {
    const current = this.listeners.get(event) ?? [];
    this.listeners.set(event, [...current, callback as Listener]);

    return () => {
      this.listeners.set(
        event,
        (this.listeners.get(event) ?? []).filter((cb) => cb !== callback),
      );
    };
  }

  once<E extends keyof Events>(event: E, callback: Events[E]) {
    const unbind = this.on(event, ((...args: any[]) => {
      unbind();
      (callback as Listener)(...args);
    }) as Events[E]);

    return unbind;
  }

  private emit(event: keyof Events, ...args: any[]) {
    // Copy first: a listener may unbind itself while we iterate.
    [...(this.listeners.get(event) ?? [])].forEach((cb) => cb(...args));
  }

  /** Deliver a frame from the "server" to the cable. */
  receive(msg: object) {
    this.emit('data', JSON.stringify(msg));
  }

  /** Frames written by the client, parsed. */
  get sentMessages(): Record<string, any>[] {
    return this.sent.map((frame) => JSON.parse(frame));
  }

  /** The identifier the client used in its first `subscribe` command. */
  get subscribeIdentifier(): string | undefined {
    return this.sentMessages.find(({ command }) => command === 'subscribe')
      ?.identifier;
  }
}
