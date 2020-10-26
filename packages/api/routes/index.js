const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/status", function(req, res, next) {
  return res.json({ message: "Server is running" });
});

module.exports = router;
