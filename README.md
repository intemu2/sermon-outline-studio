# Sermon Outline Studio

**From Scripture to a preachable outline in a minute.**

Built for the [AI for Church Hackathon 2026](https://aiforchurch.com/hackathon) (build window 30 Oct – 27 Nov 2026). Track: **Discipleship & Spiritual Growth**. Solo entry, 100% free to build and to use.

## The problem

Pastors spend 10–20 hours a week on sermon preparation. The blank page is the hardest part — not because pastors lack faithfulness, but because turning a passage into a structured, preachable outline takes real time every single week.

## What it does

Type a Bible passage and a topic, and Sermon Outline Studio returns a complete draft outline in seconds:

- **Live Scripture text** — the exact verse text is fetched from [bible-api.com](https://bible-api.com/) (free, no key), so the outline is anchored in Scripture, not in a model's memory. Translations: WEB, KJV, ASV, BBE.
- **A big idea** — one sentence that states what the sermon is about.
- **Three main points** — each with an explanation, a supporting verse, a concrete illustration, and a specific application step.
- **Discussion questions** and a **closing prayer**.
- **Copy as Markdown, Download .md, Print, and Save** (saved only in the browser's localStorage — no account, no server, no congregant data anywhere).

Ten well-known passages (John 3:16, Psalm 23, Romans 8:28, Luke 15:11–24, Philippians 4:13, Jeremiah 29:11, Matthew 6:9–13, 1 Corinthians 13:4–7, Hebrews 11:1, Isaiah 40:31) get hand-written, passage-specific points. Any other passage or topic gets a structured outline built from its theme (faith, hope, love, prayer, forgiveness, peace…) or a faithful generic three-point structure.

## AI — two layers, honestly labelled

1. **Instant outline (on-device engine, no key needed).** The default path. It is a draft, and the app says so on screen.
2. **Optional LLM enhancement.** Paste your own free Groq API key (free tier, no card) and the app asks the model to sharpen the wording of the existing points — same passage, same structure, no invented verses. The key is stored only in your browser and sent only to Groq, never to us.

The project itself was built with AI assistance, and it clearly features AI in how it works — satisfying the hackathon's AI requirement both ways.

## Faithfulness & responsible AI

AI can misquote Scripture and flatten meaning. That is why:

- Verse text comes from a Bible API, not from a model.
- Every point shows its supporting reference.
- The app repeats, on screen and in every export: **"AI drafts — the pastor decides. Verify every verse in your own Bible before preaching."**
- No congregant or personal data is collected. Everything is local.

## Run it

No build step, no dependencies, no server needed — it is plain HTML/CSS/JS:

```bash
# any static server works, e.g.
python3 -m http.server 8000
# then open http://localhost:8000
```

Or open `index.html` directly in a browser (the verse lookup needs internet access).

Deep links to examples: `index.html?example=john316`, `?example=psalm23`, `?example=romans828`, `?example=luke15`, `?example=phil413`, `?example=jer2911`, `?example=matt6`, `?example=1cor13`, `?example=heb111`, `?example=isa4031`.

## Tech

- Static site: `index.html` + `styles.css` + `app.js`
- Verse text: bible-api.com
- Optional LLM: Groq OpenAI-compatible API (`openai/gpt-oss-120b` by default), user-supplied key only

## License

MIT. Scripture quotations come from the Bible API in the translation you select; check the translation's own terms if you republish them.

> "Preach the word; be ready in season and out of season." — 2 Timothy 4:2
