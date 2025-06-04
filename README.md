# Cloudflare Worker: Path-Based Key Switch

This simple Cloudflare Worker returns a secret key based on the URL path. If the path matches a user, it returns their key. Otherwise, it returns a 403 Forbidden.

## Usage

- Deploy this worker using Cloudflare Wrangler.
- Access your worker at `https://<your-worker>.workers.dev/<user>`
- Example: `https://example.workers.dev/userA` → returns `A-SECRET-KEY`
- Example: `https://example.workers.dev/unknown` → returns `Forbidden` (403)

## Configuration

- Edit `index.js` to add or change user keys in the `userKeys` object.

## Deploy

1. Install [Wrangler](https://developers.cloudflare.com/workers/wrangler/install/):
   ```sh
   npm install -g wrangler
   ```
2. Authenticate:
   ```sh
   wrangler login
   ```
3. Deploy:
   ```sh
   wrangler publish
   ```

## Local Development

Run locally with:
```sh
wrangler dev
```

---

Edit `wrangler.toml` with your account details as needed.
