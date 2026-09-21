---
name: add-cup-photos
description: Convert this year's Burritt Cup trip photos from HEIC (iPhone format) to web-ready JPEGs and wire them into public/data/locations.json. Use when the user says things like "add this year's photos", "convert the HEIC photos", "add photos for <year>", or drops new .HEIC files into public/img/full and wants them on the site.
---

# Add Burritt Cup Photos

Turns a folder of iPhone `.HEIC` photos from this year's trip into the JPEGs and
`locations.json` entries the site actually uses.

## When to use this

The user has copied new `.HEIC` photos into `public/img/full` (usually named
something like `<phone default>.HEIC`, or already renamed to the site
convention) for a location/year that either already has a placeholder entry
in `public/data/locations.json` or needs a brand new one.

## Steps

### 1. Find the new HEIC files and figure out the naming convention

```bash
ls public/img/full/*.HEIC
```

Existing photos follow `<location-shorthand>_<year>_<n>.jpg` (or `.jpeg`),
e.g. `lawsonia_2025_3.jpeg`, `bloom_2024_9.jpeg`, `indy_2023_12.jpeg`. If the
HEIC files aren't already named that way, rename them to match before
converting — pick the location shorthand from the year's `subtitle` field in
`locations.json` (or ask the user if it's ambiguous).

### 2. Check source dimensions

```bash
sips -g pixelWidth -g pixelHeight -g format public/img/full/<file>.HEIC
```

iPhone photos are typically landscape 4:3 (e.g. `4032x3024`, `5712x4284`).
Panoramas or screenshots may have a very different ratio — that's fine, just
note it.

### 3. Convert to JPEG, keeping native orientation

Established convention for this site (confirmed with the user in 2026): do
**not** force-crop landscape photos into a portrait box. Keep each photo's
native aspect ratio and just scale it down for the web. `--resampleWidth 768`
is the right call for the landscape shots this trip produces (it happens to
match the site's existing photo sizing, e.g. 4:3 sources land on 768x576):

```bash
sips -s format jpeg public/img/full/<file>.HEIC --resampleWidth 768 \
  --out public/img/full/<file>.jpg
```

If a photo is portrait to begin with, use `--resampleHeight 768` instead so
it scales proportionally rather than stretching. If the user wants a
different treatment this year (e.g. they specifically ask for a fixed
portrait box like 576x768), stop and ask how to handle landscape photos
before batch-converting — cropping loses content off the edges, so that's a
decision for the user, not a default.

Run this in a loop over all the HEIC files, then confirm dimensions:

```bash
for f in public/img/full/*.HEIC; do
  base="${f%.HEIC}"
  sips -s format jpeg "$f" --resampleWidth 768 --out "${base}.jpg"
done
```

### 4. Delete the original HEIC files

Once the JPEGs are confirmed to look right, remove the `.HEIC` originals —
the site only ever references the converted JPEGs:

```bash
rm public/img/full/*.HEIC
```

### 5. Update `public/data/locations.json`

Find the entry for this year (`"title": "<year>"`). If it doesn't exist yet,
create it — ask the user for `subtitle` (course names / rounds), `awards`,
and `summary` if those aren't provided, since that's content only they know.

Replace/populate the `"images"` array with one object per converted photo,
matching the existing shape:

```json
{
  "location": "img/full/<file>.jpg",
  "title": "",
  "alt": "<Location Name> <Year> <n>"
}
```

- `location` is the path relative to `public/`, no leading slash.
- `alt` follows the short-name convention used elsewhere (e.g. `"Lawsonia 2025 3"`, `"Grand Rapids 2026 5"`).
- Leave `title` empty — it's a human caption and can't be inferred from the
  filename. Tell the user which entries are missing captions so they can fill
  them in later.

### 6. Validate

```bash
python3 -c "import json; json.load(open('public/data/locations.json')); print('valid JSON')"
npx prettier --check public/data/locations.json   # or --write if it fails
```

The repo's pre-commit hook (husky + lint-staged) will also run `prettier`
and `eslint` on staged files, and `npm run test:run`, so formatting mistakes
here would get caught at commit time anyway — but it's faster to check now.

## Notes

- No extra tools needed — `sips` is built into macOS and handles HEIC
  natively. Don't reach for ImageMagick/ffmpeg unless `sips` is unavailable.
- Don't touch other years' entries or images.
- Don't invent `title` captions or `summary`/`awards` text — that's the
  user's content, not something to guess.
