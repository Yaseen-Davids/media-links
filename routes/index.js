var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/status", (req, res, next) => {
  return res.json({ STATUS: "API IS RUNNING!" });
});

module.exports = router;
