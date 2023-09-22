# FZF worker

Cloudflare Worker that provides a fuzzy finder for videos hosted on a public oracle cloud bucket

## Authors

- [@Endercass](https://www.github.com/Endercass)

## API Reference

#### Search for video

```http
  GET /git
  GET /repo
```

Responds with a link to this repository

```http
  GET /${search}
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `search`  | `string` | **Required**. The video you want to find |

Responds with a webm video or an empty html file if nothing can be found

## Run Locally

Clone the project

```bash
  git clone https://github.com/Endercass/fzfworker.git
```

Go to the project directory

```bash
  cd fzfworker
```

Install dependencies

```bash
  npm install
```

Start the local wrangler server

```bash
  npm run start
```

## Deployment

To deploy this worker run

```bash
  npm run deploy
```

## Appendix

- Videos are downloaded externally to reduce overhead
- Files are hosted on an Oracle Cloud Infrastructure object storage instance
