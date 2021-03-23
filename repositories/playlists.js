const knex = require("../knex");

const getAllPlaylists = async () => await knex.select("*").from("playlists");

const getYoutubePlaylists = async () => {
  try {
    return await knex.select("*").from("playlists").where("user_id", -99);
  } catch (error) {
    console.log("getYoutubePlaylists error => ", error);
    throw error;
  }
};

const createPlaylist = async (body) => await knex("playlists").insert({ name: body.name, user_id: body.user_id, date_added: new Date() }).returning("id");

const getPlaylistByUser = async (id) => await knex.select("*").from("playlists").where("user_id", id);

const getPlaylistByPlaylistId = async (id) => await knex.first("*").from("playlists").where("id", id);

const updateCurrentPlaylist = async (id, body) => {
  await knex("playlists").update(body).where("id", id);
  const playlist = await getPlaylistByPlaylistId(id);

  return playlist;
};
const deletePlaylistById = async (id) => await knex("playlists").del().where("id", id);

module.exports = {
  getAllPlaylists,
  createPlaylist,
  getPlaylistByUser,
  getPlaylistByPlaylistId,
  updateCurrentPlaylist,
  deletePlaylistById,
  getYoutubePlaylists,
};
