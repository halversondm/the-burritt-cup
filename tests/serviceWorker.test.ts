import { afterEach, beforeEach, expect, test, vi } from "vitest";

type Config = {
  onUpdate?: (r: unknown) => void;
  onSuccess?: (r: unknown) => void;
};

interface FakeWorker {
  state: string;
  onstatechange?: () => void;
}
interface FakeRegistration {
  installing: FakeWorker | null;
  onupdatefound?: () => void;
  unregister: ReturnType<typeof vi.fn>;
}

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

function setUrl(url: string) {
  (
    window as unknown as { happyDOM: { setURL: (u: string) => void } }
  ).happyDOM.setURL(url);
}

function fakeRegistration(): FakeRegistration {
  return {
    installing: null,
    unregister: vi.fn().mockResolvedValue(true),
  };
}

async function load(url: string) {
  vi.resetModules();
  setUrl(url);
  return await import("../src/service-worker.js");
}

let serviceWorker: {
  register: ReturnType<typeof vi.fn>;
  ready: Promise<FakeRegistration>;
  controller: object | null;
};
let registration: FakeRegistration;
let loadListeners: EventListener[] = [];

beforeEach(() => {
  registration = fakeRegistration();
  serviceWorker = {
    register: vi.fn().mockResolvedValue(registration),
    ready: Promise.resolve(registration),
    controller: null,
  };
  Object.defineProperty(navigator, "serviceWorker", {
    value: serviceWorker,
    configurable: true,
  });
  loadListeners = [];
  const addListener = window.addEventListener.bind(window);
  vi.spyOn(window, "addEventListener").mockImplementation(((
    type: string,
    listener: EventListener,
  ) => {
    if (type === "load") loadListeners.push(listener);
    addListener(type, listener);
  }) as typeof window.addEventListener);
  vi.stubEnv("PROD", true);
  vi.stubEnv("VITE_PUBLIC_URL", "https://example.com");
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  loadListeners.forEach((l) => window.removeEventListener("load", l));
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  delete (navigator as unknown as Record<string, unknown>).serviceWorker;
});

function installWorker(config: Config) {
  const worker: FakeWorker = { state: "installing" };
  registration.installing = worker;
  registration.onupdatefound!();
  worker.state = "installed";
  worker.onstatechange!();
  return config;
}

test("register does nothing outside production", async () => {
  vi.stubEnv("PROD", false);
  const { register } = await load("https://example.com/");
  register({});
  window.dispatchEvent(new Event("load"));
  expect(serviceWorker.register).not.toHaveBeenCalled();
});

test("register does nothing when the public URL is another origin", async () => {
  const { register } = await load("https://other.com/");
  register({});
  window.dispatchEvent(new Event("load"));
  expect(serviceWorker.register).not.toHaveBeenCalled();
});

test("register on a non-localhost host registers and reports offline-ready", async () => {
  const { register } = await load("https://example.com/");
  const config = { onSuccess: vi.fn(), onUpdate: vi.fn() };
  register(config);
  window.dispatchEvent(new Event("load"));
  await flush();
  expect(serviceWorker.register).toHaveBeenCalledWith(
    "https://example.com/service-worker.js",
  );
  installWorker(config);
  expect(config.onSuccess).toHaveBeenCalledWith(registration);
  expect(config.onUpdate).not.toHaveBeenCalled();
  expect(console.log).toHaveBeenCalledWith(
    "Content is cached for offline use.",
  );
});

test("an installed worker with an existing controller reports an update", async () => {
  serviceWorker.controller = {};
  const { register } = await load("https://example.com/");
  const config = { onSuccess: vi.fn(), onUpdate: vi.fn() };
  register(config);
  window.dispatchEvent(new Event("load"));
  await flush();
  installWorker(config);
  expect(config.onUpdate).toHaveBeenCalledWith(registration);
  expect(config.onSuccess).not.toHaveBeenCalled();
});

test("installed worker without config callbacks does not throw", async () => {
  const { register } = await load("https://example.com/");
  register();
  window.dispatchEvent(new Event("load"));
  await flush();
  expect(() => installWorker({})).not.toThrow();
  serviceWorker.controller = {};
  expect(() => installWorker({})).not.toThrow();
});

test("update found with no installing worker is ignored", async () => {
  const { register } = await load("https://example.com/");
  register({});
  window.dispatchEvent(new Event("load"));
  await flush();
  expect(() => registration.onupdatefound!()).not.toThrow();
});

test("registration failure is logged", async () => {
  const error = new Error("nope");
  serviceWorker.register.mockRejectedValue(error);
  const { register } = await load("https://example.com/");
  register({});
  window.dispatchEvent(new Event("load"));
  await flush();
  expect(console.error).toHaveBeenCalledWith(
    "Error during service worker registration:",
    error,
  );
});

test("on localhost a valid service worker file is registered", async () => {
  vi.stubEnv("VITE_PUBLIC_URL", "http://localhost");
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      status: 200,
      headers: { get: () => "application/javascript" },
    }),
  );
  const { register } = await load("http://localhost/");
  register({});
  window.dispatchEvent(new Event("load"));
  await flush();
  expect(serviceWorker.register).toHaveBeenCalledWith(
    "http://localhost/service-worker.js",
  );
  expect(console.log).toHaveBeenCalledWith(
    expect.stringContaining("served cache-first"),
  );
});

test("on localhost a missing service worker unregisters and reloads", async () => {
  vi.stubEnv("VITE_PUBLIC_URL", "http://localhost");
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      status: 404,
      headers: { get: () => "text/html" },
    }),
  );
  const { register } = await load("http://localhost/");
  register({});
  window.dispatchEvent(new Event("load"));
  await flush();
  await flush();
  expect(registration.unregister).toHaveBeenCalled();
  expect(serviceWorker.register).not.toHaveBeenCalled();
});

test("on localhost a non-javascript response is treated as missing", async () => {
  vi.stubEnv("VITE_PUBLIC_URL", "http://localhost");
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      status: 200,
      headers: { get: () => "text/html" },
    }),
  );
  const { register } = await load("http://localhost/");
  register({});
  window.dispatchEvent(new Event("load"));
  await flush();
  await flush();
  expect(registration.unregister).toHaveBeenCalled();
});

test("on localhost a failed fetch logs offline mode", async () => {
  vi.stubEnv("VITE_PUBLIC_URL", "http://localhost");
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
  const { register } = await load("http://localhost/");
  register({});
  window.dispatchEvent(new Event("load"));
  await flush();
  expect(console.log).toHaveBeenCalledWith(
    "No internet connection found. App is running in offline mode.",
  );
});

test("unregister unregisters the active registration", async () => {
  const { unregister } = await load("https://example.com/");
  unregister();
  await flush();
  expect(registration.unregister).toHaveBeenCalled();
});

test("unregister is a no-op without service worker support", async () => {
  const { unregister } = await load("https://example.com/");
  delete (navigator as unknown as Record<string, unknown>).serviceWorker;
  expect(() => unregister()).not.toThrow();
  expect(registration.unregister).not.toHaveBeenCalled();
});
