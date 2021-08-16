const lighthouse = require("lighthouse");
const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

const launchBrowserAndRunLighthouse = async (url) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const options = {
    logLevel: "info",
    output: "html",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    port: new URL(browser.wsEndpoint()).port,
  };

  const runnerResult = await lighthouse(url, options);
  const reportHtml = runnerResult.report;

  await browser.close();

  return reportHtml;
};

app.get("/", async (req, res) => {
  try {
    const results = await launchBrowserAndRunLighthouse(
      "https://debradwinans.com/"
    );

    res.send(results);
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sever is listening on port ${PORT}`));
