const express = require("express");
const router = express.Router();
const ytdl = require("ytdl-core");

router.post("/song", async (req, res, next) => {
  try {
    const url = req.body.url;
    const readableStream = ytdl(url, { filter: "audioonly", quality: "highestaudio" });

    ytdl.getInfo(url, (err, info) => {
      if (err) {
        throw new Error(err);
      }

      const videoName = info.videoDetails.title.toString("ascii");
      res.setHeader("filename", videoName);
      readableStream.pipe(res);
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
