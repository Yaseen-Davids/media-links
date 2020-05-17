const axios = require("axios");
const knex = require("../knex");

module.exports = {
  createMediaLink: async (item) => {
    const { url, type, userId } = item;

    if (!url || url.length <= 0) {
      throw "URL no specified";
    }

    return await knex.transaction(async (trx) => {
      let result;

      if (url.includes("youtube.com") || url.includes("youtu.be")) {
        const { data } = await axios.get(
          `https://www.youtube.com/oembed?url=${url}&format=json`
        );
        result = data;
      } else if (url.includes("soundcloud.com")) {
        const { data } = await axios.get(
          `https://soundcloud.com/oembed?url=${url}&format=json`
        );
        result = data;
      }

      if (!result) throw "Error getting media link";

      await trx("media_links").insert({
        title: result.title,
        type: type || "",
        thumbnail_url: result.thumbnail_url,
        author_url: url,
        downloaded: 0,
        user_id: userId,
        date_added: new Date(),
        provided_name: result.provider_name,
      });
    });
  },
  getAllMediaLinks: async (obj) => {
    const filters = obj.filters.length > 0 ? obj.filters : ["song"];
    const sort = obj.sort || { column: "date_added", order: "desc" };
    const downloadState = obj.downloadState || { downloaded: 0 };
    const userId = obj.userId || 0;

    return await knex("media_links")
      .select("*")
      .where(downloadState)
      .whereIn("type", filters)
      .andWhere("user_id", userId)
      .orderBy([sort]);
  },
  deleteMediaLink: async (id) => {
    return await knex("media_links").update("downloaded", 1).where("id", id);
  },
};
