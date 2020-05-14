const express = require("express");
const router = express.Router();
const {
  createYoutubeLink,
  getAllYoutubeLinks,
  deleteYoutubeLink,
} = require("../repositories/youtube");

router.post("/all", async (req, res, next) => {
  try {
    const data = await getAllYoutubeLinks(req.body);
    return res.json({ data }).end();
  } catch (error) {
    return next(error);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    await createYoutubeLink(req.body);
    return res.status(200).end();
  } catch (error) {
    return next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    await deleteYoutubeLink(req.params.id);
    return res.json({ message: "Successfully deleted link." }).end();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
