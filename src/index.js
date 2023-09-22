const Fuse = require("fuse.js");

const db = require("../config/db.json");
const config = require("../config/config.json");

let cfg = {
  items: db,
  name: config.name,
};

cfg.items.map((val, i, arr) => {
  if (config.overrides[val.name]) {
    val.aliases = config.overrides[val.name].aliases;
  }
});

const fuse = new Fuse(cfg.items, {
  includedScore: true,
  keys: ["name", "aliases"],
});

const invalidSearch = `<!DOCTYPE html>
<html>
<head>
  <title>${cfg.name}</title>
  <meta charset="utf-8">
  <meta name="robots" content="noindex">
  <meta name="theme-color" content="">
  <meta property="og:title" content="FZFShip">
  <meta property="og:description" content="Invalid search.">
</head>
</html>`;

const videoEmbed = (worker_url, item) => `<!DOCTYPE html>
<html>
<head>
  <title>${cfg.name} | ${item.item.name}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="twitter:card" content="player">
  <meta name="twitter:site" content="@Endercass0001">
  <meta name="twitter:creator" content="@Endercass0001">
  <meta name="twitter:title" content="${cfg.name} | ${item.item.name}">
  <meta name="twitter:image" content="https://cdn.shirt.rip/play.jpg">
  <meta name="twitter:player" content="${worker_url}">
  <meta name="twitter:player:width" content="1920">
  <meta name="twitter:player:height" content="1080">
  <meta name="twitter:player:stream" content="${item.item.url}">
  <meta name="twitter:player:stream:content_type" content="video/webm">
  <meta content="https://cdn.shirt.rip/play.jpg" property="og:image">
  <meta content="video.other" property="og:type">
  <meta content="${item.item.url}" property="og:video:url">
  <meta content="1280" property="og:video:width">
  <meta content="720" property="og:video:height">
  <style>
    body {
      background-color: #000;
    }

    video {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      max-height: 100%;
      max-width: 100%;
      margin: auto;
    }
  </style>
</head>
<body>
</body>
  <video controls="" autoplay="" poster="https://cdn.shirt.rip/play.jpg" width="1920" crossorigin="anonymous">
    <source src="${item.item.url}" type="video/webm">
  </video>
</html>`;

export default {
  async fetch(request, env, ctx) {
    let search = decodeURIComponent(new URL(request.url).pathname.slice(1));
    switch (search) {
      case "git":
      case "repo":
        return Response.redirect("https://github.com/Endercass/fzfworker", 301);
      default:
        let items = fuse.search(search);
        if (items.length == 0) {
          return new Response(invalidSearch, {
            headers: {
              "content-type": "text/html; charset=UTF-8",
            },
          });
        }
        let item = items[0];
        return new Response(videoEmbed(request.url, item), {
          headers: {
            "content-type": "text/html; charset=UTF-8",
          },
        });
    }
  },
};
