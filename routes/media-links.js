const express = require("express");
const router = express.Router();
const {
  createMediaLink,
  getAllMediaLinks,
  deleteMediaLink,
} = require("../repositories/media-links");

router.post("/all", async (req, res, next) => {
  try {
    const data = await getAllMediaLinks(req.body);
    return res.json({ data }).end();
  } catch (error) {
    return next(error);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const data = await createMediaLink(req.body);
    return res.json({ data });
  } catch (error) {
    console.log("error => ", error);
    return next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    await deleteMediaLink(req.params.id);
    return res.json({ message: "Successfully deleted link." }).end();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
