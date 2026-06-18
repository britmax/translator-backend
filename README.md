Translator Backend (CC0‑1.0)
This project provides a simple, lightweight translation API designed for use with web front‑ends, Google Sites embeds, subtitle tools, and other applications that require plain‑text translation with no formatting, no markup, and no extra metadata.

The backend uses:

Node.js

Express

OpenRouter (LLM translation)

A single /translate POST endpoint

The goal is to offer a clean, predictable translation service that returns only the translated text, suitable for TXT and SRT workflows.

Features
POST /translate endpoint

Accepts JSON input:

text: the text to translate

target: the target language

Returns JSON output:

translated: plain‑text translation

No HTML, no markup, no formatting

Works with Google Sites, iframes, and browser fetch calls

CC0‑1.0 licensed (public domain)

Example Request
json
POST /translate
{
  "text": "Hello world",
  "target": "es"
}
Example Response
json
{
  "translated": "Hola mundo"
}
Environment Variable
The service requires one environment variable:

Code
OPENROUTER_API_KEY
This key is used to access the OpenRouter translation model.

Deployment
This backend is designed to run on platforms like Render, Railway, Fly.io, or any Node‑compatible hosting provider.

A typical start command:

Code
node server.js
Dependencies are installed with:

Code
npm install
License
This project is released under the CC0‑1.0 Universal License, placing it in the public domain.
You may use, modify, distribute, or build upon this project for any purpose, without restriction.
