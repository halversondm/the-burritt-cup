import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { beforeAll, afterAll, afterEach } from "vitest";

const server = setupServer(
  http.get("/data/awards.json", () => {
    return HttpResponse.json([
      {
        image: "./img/full/the_cup.jpg",
        alt: "The Burritt Cup",
        title: "The Burritt Cup",
        subtitle: "In all it's glory",
        metatitle:
          "This Cup is the goal of the weekend. The bragging rights for the next year go to the winners of the Cup. Teams are chosen at random and vary from year to year.",
        winners: [
          {
            year: "2023",
            name: "Owen Burritt, Gene Filippo, Mike Robey, and Dan Halverson",
          },
          {
            year: "2022",
            name: "Jim Kopitke and Nat DeRose",
          },
        ],
      },
    ]);
  }),
  http.get("/data/locations.json", () => {
    return HttpResponse.json([
      {
        title: "2006",
        subtitle: "Swan Lake Resort - Plymouth, Indiana",
        metatitle: "The Inaugural Burritt Cup Weekend",
        images: [
          {
            location: "./img/full/Swan_Lake_2006_1.JPG",
            title:
              "(L to R) Owen Burritt, Brian Zimmerman, Dan Coulter and Kyle Burritt",
            alt: "Swan Lake 2006",
          },
        ],
      },
      {
        title: "2007",
        subtitle: "Coachman's Golf Resort - Edgerton, Wisconsin",
        metatitle: "A classy joint.",
      },
    ]);
  }),
  http.get("/data/players.json", () => {
    return HttpResponse.json([
      {
        image: "img/full/owen_full.jpg",
        thumbnail: "./img/thumbnails/owen_head.jpg",
        alt: "Owen Burritt",
        name: "Owen Burritt",
        office: "Burritt Cup Commissioner",
        hometown: "Bartlett, Illinois",
        nickname: "Hook",
        about:
          "Owen likes to hit left. Hence the nickname.  Fun Fact: As of 2018, Owen has yet to win the Cup bearing his name!  Ask him about it and expect a terse response!",
      },
      {
        image: "img/full/kyle_full.jpg",
        thumbnail: "./img/thumbnails/kyle_head.jpg",
        alt: "Kyle Burritt",
        name: "Kyle Burritt",
        office: "Burritt Cup Rules Committee",
        hometown: "Lombard, Illinois",
        nickname: "Hooteria",
        about:
          "As the story goes, Kyle earned his nickname for a run in with some bad Hooters wings. He had to make an emergency stop during the first hole during the 2014 Cup Weekend.",
      },
    ]);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
