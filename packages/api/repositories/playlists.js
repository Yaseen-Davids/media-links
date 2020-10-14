const knex = require("../knex");

module.exports = {
  getAllPlaylists: async () => await knex.select("*").from("playlists"),
  createPlaylist: async (body) => {
    return await knex("playlists").insert({ name: body.name, user_id: body.user_id }).returning("id");
  },
  getPlaylistByUser: async (id) => await knex.select("*").from("playlists").where("user_id", id),
};
