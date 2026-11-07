import { render, screen } from "@testing-library/react";
import Award from "../src/Award";
import Main from "../src/Main";
import Player from "../src/Player";
import Post from "../src/Post";

test("Main shows the welcome content", () => {
  render(<Main />);
  expect(screen.getByText("Welcome to The Burritt Cup")).toBeTruthy();
  expect(screen.getByText("Where is The Burritt Cup?")).toBeTruthy();
});

test("Award renders image and winners rows", () => {
  render(
    <Award
      image="cup.jpg"
      alt="The Cup"
      title="Cup"
      subtitle="Sub"
      metatitle="Meta"
      winners={[
        { year: "2023", name: "A" },
        { year: "2022", name: "B" },
      ]}
    />,
  );
  expect(screen.getByAltText("The Cup").getAttribute("src")).toBe("cup.jpg");
  expect(screen.getAllByRole("row")).toHaveLength(3);
});

test("Award omits image when empty", () => {
  render(
    <Award image="" alt="" title="T" subtitle="" metatitle="" winners={[]} />,
  );
  expect(screen.queryByRole("img")).toBeNull();
});

test("Player renders office and links", () => {
  render(
    <Player
      image="full.jpg"
      thumbnail="thumb.jpg"
      alt="Pic"
      name="Kyle"
      office="Rules"
      hometown="Lombard"
      nickname="Hoot"
      about="Story"
    />,
  );
  expect(screen.getByText("Rules")).toBeTruthy();
  expect(screen.getByAltText("Pic").getAttribute("src")).toBe("thumb.jpg");
  expect(screen.getByRole("link").getAttribute("href")).toBe("full.jpg");
  expect(screen.getByText("Story")).toBeTruthy();
});

test("Player omits office when empty", () => {
  render(
    <Player
      image=""
      thumbnail=""
      alt=""
      name="Kyle"
      office=""
      hometown=""
      nickname=""
      about=""
    />,
  );
  expect(screen.queryByRole("heading", { level: 3 })).toBeNull();
});

test("Post renders summary, awards, array subtitle and images", () => {
  render(
    <Post
      title="2006"
      subtitle={["Line one", "Line two"] as unknown as string}
      metatitle="Meta"
      summary="A summary"
      awards={["Best Hat"] as unknown as []}
      images={[{ location: "a.jpg", alt: "Alt A", title: "Caption A" }]}
    />,
  );
  expect(screen.getByText("Line two")).toBeTruthy();
  expect(screen.getByText("Best Hat")).toBeTruthy();
  expect(screen.getByText("Summary")).toBeTruthy();
  expect(screen.getByText("Photo Gallery")).toBeTruthy();
  expect(screen.getAllByAltText("Alt A").length).toBeGreaterThan(0);
});

test("Post omits optional sections when empty", () => {
  render(
    <Post
      title="2007"
      subtitle="Sub"
      metatitle="Meta"
      summary=""
      awards={[]}
      images={[]}
    />,
  );
  expect(screen.queryByText("Summary")).toBeNull();
  expect(screen.queryByText("Awards")).toBeNull();
  expect(screen.queryByText("Photo Gallery")).toBeNull();
});
