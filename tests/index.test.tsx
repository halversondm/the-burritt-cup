import { expect, test } from "vitest";

test("index mounts the app into #root", async () => {
  document.body.innerHTML = '<div id="root"></div>';
  await import("../src/index");
  await expect
    .poll(() => document.getElementById("root")?.textContent)
    .toContain("Welcome to The Burritt Cup");
});
