const express = require("express");
const bodyparser = require("body-parser");
const puppeteer = require("puppeteer");
const fs = require("fs");
const Path = require("path");

const login = require("./parts/login").login;
const search = require("./parts/search.js").search;

const app = express();
var Cookie = [];

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.post("/api/torrent", async (req, res) => {
  //puppeteerInit
  let browser = await puppeteer.launch({ headless: true, slowMo: 10 });
  let page = await browser.newPage();
  //sessionLogin
  Cookie = await login(req, page, Cookie);
  //proceedWithSearch
  const torrents = await search(req.body, page);
  //sendResponse
  await res.json(torrents);
  //closeWhenDone
  await browser.close();
});

app.post("/api/download", (req, res) => {
  //downloadTorrent
  try {
    fetch
      .get(req.body.link, { responseType: "stream" })
      .then((response) =>
        response.data.pipe(
          fs.createWriteStream(Path.resolve(__dirname, "torrentfile.torrent"))
        )
      );
    res.status(200).json({ msg: "Ok" });
  } catch {
    res.status(400).json({ msg: "Error" });
  }
});

app.listen(5000, () => console.log("running"));
