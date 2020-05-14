const axios = require("axios");
const knex = require("../knex");

module.exports = {
  createYoutubeLink: async (item) => {
    const { url, type, userId } = item;

    if (!url || url.length <= 0) {
      throw "URL no specified";
    }

    return await knex.transaction(async (trx) => {
      const { data } = await axios.get(
        `https://www.youtube.com/oembed?url=${url}&format=json`
      );

      if (!data) throw "Error getting youtube link";

      await trx("youtube_links").insert({
        title: data.title,
        type: type || "",
        thumbnail_url: data.thumbnail_url,
        html_iframe: data.html,
        author_url: url,
        downloaded: 0,
        user_id: userId,
      });
    });
  },
  getAllYoutubeLinks: async (obj) => {
    const filters = obj.filters.length > 0 ? obj.filters : ["song"];
    const sort = obj.sort || { column: "id", order: "desc" };
    const downloadState = obj.downloadState || { downloaded: 0 };
    const userId = obj.userId || 0;

    return await knex("youtube_links")
      .select("*")
      .where(downloadState)
      .whereIn("type", filters)
      .andWhere("user_id", userId)
      .orderBy([sort]);
  },
  deleteYoutubeLink: async (id) => {
    return await knex("youtube_links").update("downloaded", 1).where("id", id);
  },
};
