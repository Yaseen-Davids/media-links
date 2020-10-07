const axios = require("axios");
const knex = require("../knex");

module.exports = {
  createMediaLink: async (item) => {
    const { url, type, userId, playlistId } = item;

    if (!url || url.length <= 0) {
      throw "URL no specified";
    }

    const result = await getMediaDataFromUrl(url);

    const [linkId] = await knex("media_links")
      .insert({
        title: result.title,
        type: type || "",
        thumbnail_url: result.thumbnail_url,
        author_url: url,
        downloaded: 0,
        user_id: userId,
        date_added: new Date(),
        provided_name: result.provider_name,
        playlist_id: playlistId,
      })
      .returning("id");

    return await knex("media_links").first("*").where("id", linkId); // Get added link
  },
  getAllMediaLinks: async (obj, playlistId) => {
    const sort = obj.sort || { column: "date_added", order: "desc" };
    const downloadState = obj.downloadState || { downloaded: 0 };
    // const userId = obj.userId || 0;

    return await knex("media_links").select("*").where(downloadState).where("playlist_id", playlistId).orderBy([sort]);
  },
  deleteMediaLink: async (id) => {
    return await knex("media_links").update("downloaded", 1).where("id", id);
  },
};

const getMediaDataFromUrl = async (url) => {
  let result;
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    result = await axios.get(`https://www.youtube.com/oembed?url=${url}&format=json`);
  } else if (url.includes("soundcloud.com")) {
    result = await axios.get(`https://soundcloud.com/oembed?url=${url}&format=json`);
  }

  if (!result || !result.data) throw "Error getting media link";

  return result.data;
};
