const knex = require("../knex");

module.exports = {
  getAllPlaylists: async () => await knex.select("*").from("playlists"),
  createPlaylist: async (body) => {
    return await knex("playlists").insert({ name: body.name, user_id: body.user_id }).returning("id");
  },
  getPlaylistByUser: async (id) => await knex.select("*").from("playlists").where("user_id", id),
  getPlaylistByPlaylistId: async (id) => await knex.first("*").from("playlists").where("id", id),
  updateCurrentPlaylist: async (id, body) => {
    await knex("playlists").update(body).where("id", id);
    return await getPlaylistByPlaylistId(id);
  },
  deletePlaylistById: async (id) => await knex("playlists").del().where("id", id),
};
