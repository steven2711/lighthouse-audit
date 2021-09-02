const lighthouse = require("lighthouse");
const puppeteer = require("puppeteer");
const cors = require("cors");
const express = require("express");
const dns = require("dns");
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://cyber-dojo.vercel.app",
      "https://cyberdojo.co",
      "https://www.cyberdojo.co",
    ],
  })
);

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
  res.status(200).json({ msg: "it works" });
});

app.post("/test", (req, res) => {
  const { url } = req.body;

  function checkDomainAndTest(url, res) {
    dns.lookup(url, (err, address, family) => {
      if (!address) {
        return res
          .status(404)
          .json({ success: false, msg: "Domain entered does not exist" });
      }

      async function runLighthouse(url, res) {
        let fixedUrl = "https://" + url;
        try {
          const results = await launchBrowserAndRunLighthouse(fixedUrl);
          return res.status(200).send(results);
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            success: false,
            msg: "Oops... looks like an error on our end. Try again later.",
          });
        }
      }

      runLighthouse(url, res);
    });
  }

  checkDomainAndTest(url, res);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sever is listening on port ${PORT}`));
