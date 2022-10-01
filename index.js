var express = require("express");
var bowser = require("bowser");
var app = express();
app.set("views", "./public");
app.set("view engine", "ejs");
app.get("*", async (req, res, next) => {
var browser = bowser.getParser(req.get("user-agent"));
var isValid = browser.satisfies({
  chrome: ">=55",
  edge: ">=15",
  safari: ">=11",
  firefox: ">=52",
  opera: ">=42"
  });
  if (isValid) {
  next();
  } else {
  res.status(302).redirect("https://browser-update.org/update-browser.html");
  }
});
app.get("*", async (req, res) => {
var path = require("path");
var basename = path.basename(req.path);
var fp = path.join(process.cwd(), "public", basename);
var pathname = req.query.pathname;
  if (!pathname || new RegExp("[^a-zA-Z0-9]").test(pathname)) {
  pathname = "";
  }
  require("fs").promises.stat(fp)
  .then(async (stat) => {
    if (stat.isFile() && basename !== "index.ejs") {
    res.sendFile(fp);
    } else {
    res.render("index", {pathname});
    }
  })
  .catch(async () => {
  res.status(404).render("index", {pathname});
  });
});
app.listen(8080);