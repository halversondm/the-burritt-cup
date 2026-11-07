import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../src/App";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

function scrollTo(y: number) {
  Object.defineProperty(window, "scrollY", { value: y, configurable: true });
  fireEvent.scroll(window);
}

const nav = () => document.querySelector("nav") as HTMLElement;

test("renders home route and footer", () => {
  renderAt("/");
  expect(screen.getByText("Welcome to The Burritt Cup")).toBeTruthy();
  expect(
    screen.getByText(`Copyright © The Burritt Cup ${new Date().getFullYear()}`),
  ).toBeTruthy();
});

test.each([
  ["/locations", "Locations"],
  ["/players", "Players"],
  ["/awards", "Awards"],
])("renders %s route", (path, heading) => {
  renderAt(path);
  expect(screen.getByRole("heading", { name: heading })).toBeTruthy();
});

test("mobile menu toggles and closes on link click", () => {
  renderAt("/");
  const toggle = screen.getByLabelText("Toggle navigation");
  expect(toggle.getAttribute("aria-expanded")).toBe("false");
  fireEvent.click(toggle);
  expect(toggle.getAttribute("aria-expanded")).toBe("true");
  expect(screen.getAllByRole("link", { name: "Players" })).toHaveLength(2);
  fireEvent.click(screen.getAllByRole("link", { name: "Players" })[1]);
  expect(toggle.getAttribute("aria-expanded")).toBe("false");
  expect(screen.getByRole("heading", { name: "Players" })).toBeTruthy();
});

test.each(["Home", "Locations", "Awards"])(
  "mobile menu link %s closes the menu",
  (name) => {
    renderAt("/");
    const toggle = screen.getByLabelText("Toggle navigation");
    fireEvent.click(toggle);
    fireEvent.click(screen.getAllByRole("link", { name })[1]);
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
  },
);

test("brand link closes the mobile menu", () => {
  renderAt("/");
  const toggle = screen.getByLabelText("Toggle navigation");
  fireEvent.click(toggle);
  fireEvent.click(screen.getByRole("link", { name: "The Burritt Cup" }));
  expect(toggle.getAttribute("aria-expanded")).toBe("false");
});

test("nav bar hides on scroll down, shows on scroll up, resets at top", () => {
  renderAt("/");
  expect(nav().className).toContain("bg-transparent");
  scrollTo(200);
  expect(nav().className).toContain("-translate-y-full");
  scrollTo(100);
  expect(nav().className).toContain("translate-y-0");
  scrollTo(0);
  expect(nav().className).toContain("bg-transparent");
  scrollTo(0);
});

test("scrolling up while nav is at top keeps it transparent", () => {
  renderAt("/");
  scrollTo(100);
  scrollTo(300);
  scrollTo(50);
  expect(nav().className).toContain("translate-y-0");
  scrollTo(0);
  scrollTo(40);
  scrollTo(10);
  expect(nav()).toBeTruthy();
});
