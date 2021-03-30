const express = require("express");
const router = express.Router();

const { ensureAuthenticated } = require("../repositories/base");
const { updatePlaylists } = require("../repositories/youtube");

router.get("/updatePlaylists", async (req, res, next) => {
  try {
    await updatePlaylists();
    return res.json({ message: "Success" }).end();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
