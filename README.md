# ObenGlaw (Obe) — landing page

A small static one-pager for **ObenGlaw (Obe)**: a digital familiar, described in copy as sharp, conversational, and lightly uncanny. No build step, no framework—open `index.html` in a browser or serve the folder with any static server.

## Files

| File | Role |
|------|------|
| `index.html` | Structure, sections, inline SVG architecture diagram |
| `styles.css` | Theme, layout, motion hooks, responsive rules |
| `script.js` | Intersection-based reveal, optional hero glow parallax |
| `README.md` | This file |

## View locally

From this directory:

```bash
python3 -m http.server 8080
```

Then open `http://127.0.0.1:8080/`.

## Notes

- Typography loads from [Google Fonts](https://fonts.google.com/) (Instrument Serif + Outfit). If you need fully offline use, self-host the font files and update the `link` in `index.html`.
- The page does not set analytics or third-party scripts beyond the font request.
- Content is written to match the Obe identity (private stays private, no made-up product claims). Adjust copy if your deployment context changes.

## License

Content and code are provided for this project; align licensing with your upstream policy as needed.
