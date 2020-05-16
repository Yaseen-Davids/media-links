const express = require("express");
const router = express.Router();
const {
  createMediaLink,
  getAllMediaLinks,
  deleteMediaLink,
} = require("../repositories/youtube");

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
    await createMediaLink(req.body);
    return res.status(200).end();
  } catch (error) {
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
