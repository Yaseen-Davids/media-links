const express = require("express");
const router = express.Router();
const {
  createPlaylist,
  getPlaylistByUser,
  getPlaylistByPlaylistId,
  updateCurrentPlaylist,
  deletePlaylistById,
  getYoutubePlaylists,
} = require("../repositories/playlists");
const { ensureAuthenticated } = require("../repositories/base");

router.get("/getYoutubePlaylists", async (req, res, next) => {
  try {
    const data = await getYoutubePlaylists();
    return res.json({ data }).end();
  } catch (error) {
    return next(error);
  }
});

router.get(
  "/getPlaylistByUser/:userId",
  ensureAuthenticated,
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const data = await getPlaylistByUser(parseInt(userId));
      return res.json({ data }).end();
    } catch (error) {
      return next(error);
    }
  }
);

router.post("/create", ensureAuthenticated, async (req, res, next) => {
  try {
    const data = await createPlaylist(req.body);
    return res.json({ data });
  } catch (error) {
    return next(error);
  }
});

router.get("/single/:playlistId", async (req, res, next) => {
  try {
    const data = await getPlaylistByPlaylistId(req.params.playlistId);
    return res.json({ data });
  } catch (error) {
    return next(error);
  }
});

router.post(
  "/update/:playlistId",
  ensureAuthenticated,
  async (req, res, next) => {
    try {
      const data = await updateCurrentPlaylist(req.params.playlistId, req.body);
      return res.json({ data });
    } catch (error) {
      return next(error);
    }
  }
);

router.delete(
  "/delete/:playlistId",
  ensureAuthenticated,
  async (req, res, next) => {
    try {
      await deletePlaylistById(req.params.playlistId);
      return res.send();
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
