import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { vi } from "vitest";
import Awards from "../src/Awards";
import Locations from "../src/Locations";
import Players from "../src/Players";

test("Players renders fetched players", async () => {
  render(<Players />);
  expect(await screen.findByText("Hooteria", { exact: false })).toBeTruthy();
  expect(screen.getAllByText("Owen Burritt").length).toBeGreaterThan(0);
  expect(screen.getByText("Burritt Cup Rules Committee")).toBeTruthy();
});

test("Awards renders fetched awards and winners", async () => {
  render(<Awards />);
  expect(await screen.findByText("In all it's glory")).toBeTruthy();
  expect(screen.getByText("Jim Kopitke and Nat DeRose")).toBeTruthy();
  expect(screen.getByText("2023")).toBeTruthy();
});

test("Locations renders fetched locations", async () => {
  render(<Locations />);
  expect(
    await screen.findByText("Swan Lake Resort - Plymouth, Indiana"),
  ).toBeTruthy();
  expect(screen.getByText("A classy joint.")).toBeTruthy();
});

test("data pages log an error when the fetch fails", async () => {
  const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
  const server = setupServer(
    http.get("/data/players.json", () => HttpResponse.error()),
  );
  server.listen();
  try {
    render(<Players />);
    await vi.waitFor(() =>
      expect(consoleError).toHaveBeenCalledWith(
        "Failed to load players:",
        expect.anything(),
      ),
    );
  } finally {
    server.close();
    consoleError.mockRestore();
  }
});
