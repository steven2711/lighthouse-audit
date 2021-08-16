const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const express = require("express");
const app = express();

const launchChromeAndRunLighthouse = async (url) => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
  const options = {
    logLevel: "info",
    output: "html",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    port: chrome.port,
  };

  const runnerResult = await lighthouse(url, options);
  const reportHtml = runnerResult.report;

  await chrome.kill();

  return reportHtml;
};

app.get("/", async (req, res) => {
  try {
    const results = await launchChromeAndRunLighthouse(
      "https://debradwinans.com/"
    );

    res.send(results);
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sever is listening on port ${PORT}`));
