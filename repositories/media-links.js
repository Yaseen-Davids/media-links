const axios = require("axios");
const knex = require("../knex");

const createMediaLink = async (item) => {
  const { url, userId, playlistId } = item;

  if (!url || url.length <= 0) {
    throw "URL no specified";
  }

  const result = await getMediaDataFromUrl(url);

  const [linkId] = await knex("media_links")
    .insert({
      title: result.title,
      thumbnail_url: result.thumbnail_url,
      author_url: url,
      removed: 0,
      user_id: userId,
      date_added: new Date(),
      provided_name: result.provider_name,
      playlist_id: playlistId,
      author_name: result.author_name,
    })
    .returning("id");

  const link = await knex("media_links").first("*").where("id", linkId); // Get added link
  return link;
};

const getAllMediaLinks = async (obj, playlistId) => {
  const sort = obj.sort || { column: "date_added", order: "desc" };
  const linkState = obj.linkState || { removed: 0 };

  const links = await knex("media_links").select("*").where(linkState).where("playlist_id", playlistId).orderBy([sort]);
  return links;
};

const deleteMediaLink = async (id) => await knex("media_links").update("removed", 1).where("id", id);

module.exports = {
  createMediaLink,
  getAllMediaLinks,
  deleteMediaLink,
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
