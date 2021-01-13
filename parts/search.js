module.exports.search = async function (body, page) {
  //linkCreation
  const link = `https://ncore.cc/torrents.php?oldal=${
    body.oldal === undefined ? "1" : body.oldal
  }&miszerint=seeders&hogyan=DESC&tipus=kivalasztottak_kozott&kivalasztott_tipus=${
    body.tipus === undefined ? "xvid_hun" : body.tipus
  }&mire=${body.query === undefined ? "" : body.query}&miben=name&tags=${
    body.kategoria === undefined ? "" : body.kategoria
  }`;
  await page.goto(link, { waitUntil: "networkidle0" });
  //scrapingContent
  let results = [];
  try {
    //selectTorrentBox
    await page.waitForSelector(".box_torrent");
    const elemek = await page.$$(".box_torrent");
    for (let el of elemek) {
      try {
        results.push({
          title_eng: await el.$eval(".torrent_txt > a", (node) =>
            node.getAttribute("title")
          ),
          title_hun: await el.$eval(
            "div.torrent_txt_also div.siterank span",
            (node) => node.innerText
          ),
          link_torrent: await el.$eval(
            ".torrent_txt > a",
            (node) =>
              `https://ncore.cc/torrents.php?action=download&id=${node
                .getAttribute("href")
                .substring(31)}&key=22fc06406e470e0d7a0523df66395956`
          ),
          link_imdb: await el.$eval(".siterank > a", (node) =>
            node.getAttribute("href").substring(22)
          ),
          imdb_score: await el.$eval(
            "div.siterank a.infolink",
            (node) => node.innerText
          ),
          upload_date: await el.$eval("[class*='box_feltoltve']", (node) =>
            node.innerText.substring(0, 10)
          ),
          size: await el.$eval(
            "[class*='box_meret']",
            (node) => node.innerText
          ),
        });
      } catch {
        try {
          results.push({
            title_eng: await el.$eval(".torrent_txt > a", (node) =>
              node.getAttribute("title")
            ),
            title_hun: await el.$eval(".torrent_txt > a", (node) =>
              node.getAttribute("title")
            ),
            link_torrent: await el.$eval(
              ".torrent_txt > a",
              (node) =>
                `https://ncore.cc/torrents.php?action=download&id=${node
                  .getAttribute("href")
                  .substring(31)}&key=22fc06406e470e0d7a0523df66395956`
            ),
            link_imdb: await el.$eval(".siterank > a", (node) =>
              node.getAttribute("href").substring(22)
            ),
            imdb_score: await el.$eval("div.siterank a.infolink", (node) =>
              node.innerText.substring(0, 10)
            ),
            upload_date: await el.$eval(
              "[class*='box_feltoltve']",
              (node) => node.innerText
            ),
            size: await el.$eval(
              "[class*='box_meret']",
              (node) => node.innerText
            ),
          });
        } catch {}
      }
    }
    return results;
  } catch {
    return { error: "NoResult" };
  }
};
