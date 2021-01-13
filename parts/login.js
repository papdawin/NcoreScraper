const { username, password } = require("../config");

module.exports.login = async function (req, page, cookie) {
  await page.setCookie(...cookie);
  await page.goto("https://ncore.cc/torrents.php", {
    waitUntil: "networkidle0",
  });
  cookie = await page
    .waitForSelector("#torrents1", { timeout: 500 })
    .then()
    .catch(async (cookie) => {
      await page.type("#nev", username, { delay: 10 });
      await page.type(
        "#loginform > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > input:nth-child(1)",
        password,
        { delay: 10 }
      );
      await page.click(".submit_btn");
      cookie = page.cookies();
      return cookie;
    });
  return cookie;
};
