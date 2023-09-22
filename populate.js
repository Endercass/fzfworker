const fs = require("fs");

const base = process.argv[2] || null;

const buildItem = (url) => ({
  name: url.name.split(".")[0].replace(/\s+/g, "-"),
  url: base + encodeURIComponent(url.name),
});

if (base == null) {
  console.error("Please specify url as first argument.");
  return;
}

fetch(base)
  .then((res) => res.json())
  .then((data) => {
    let db = [];

    data.objects.map((val, i, arr) => {
      db.push(buildItem(val));
    });
    fs.writeFileSync(
      __dirname + "/config/db.json",
      JSON.stringify(db, null, 2)
    );
  });
