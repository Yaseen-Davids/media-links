const express = require("express");
const router = express.Router();
const { createMediaLink, getAllMediaLinks, deleteMediaLink } = require("../repositories/media-links");
const { ensureAuthenticated } = require("../repositories/base");

router.post("/all/:playlistId", async (req, res, next) => {
  try {
    const data = await getAllMediaLinks(req.body, req.params.playlistId);
    return res.json({ data }).end();
  } catch (error) {
    return next(error);
  }
});

router.post("/create", ensureAuthenticated, async (req, res, next) => {
  try {
    const data = await createMediaLink(req.body);
    return res.json({ data });
  } catch (error) {
    console.log("error => ", error);
    return next(error);
  }
});

router.delete("/delete/:id", ensureAuthenticated, async (req, res, next) => {
  try {
    await deleteMediaLink(req.params.id);
    return res.json({ message: "Successfully deleted link." }).end();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
