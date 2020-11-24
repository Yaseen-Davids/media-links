const express = require("express");
const router = express.Router();
const { createPlaylist, getPlaylistByUser } = require("../repositories/playlists");
const { ensureAuthenticated } = require("../repositories/base");

router.get("/:userId", ensureAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const data = await getPlaylistByUser(parseInt(userId));
    return res.json({ data }).end();
  } catch (error) {
    return next(error);
  }
});

router.post("/create", ensureAuthenticated, async (req, res, next) => {
  try {
    const data = await createPlaylist(req.body);
    return res.json({ data });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
