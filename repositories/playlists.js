const knex = require("../knex");

const getAllPlaylists = async () => await knex.select("*").from("playlists");

const getYoutubePlaylists = async () => {
  try {
    const { rows } = await knex.raw(
      `
      select
        playlists.*
        , (
          select media_links.thumbnail_url
          from media_links
          where media_links.playlist_id = playlists.id
          limit 1
        ) as image
        , count(media_links) as links_count
      from playlists
      join media_links on media_links.playlist_id = playlists.id
      where playlists.user_id = -99
      group by playlists.id, playlists.name, playlists.user_id, playlists.date_added
      `
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const createPlaylist = async (body) =>
  await knex("playlists")
    .insert({ name: body.name, user_id: body.user_id, date_added: new Date() })
    .returning("id");

const getPlaylistByUser = async (id) => {
  const { rows } = await knex.raw(
    `
      select
        playlists.*
        , (
            select media_links.thumbnail_url
            from media_links
            where media_links.playlist_id = playlists.id
            limit 1
          ) as image
        , count(media_links) as links_count
      from playlists
      left join media_links on media_links.playlist_id = playlists.id
      where playlists.user_id = :id
      group by playlists.id, playlists.name, playlists.user_id, playlists.date_added
    `,
    { id }
  );
  return rows;
};

const getPlaylistByPlaylistId = async (id) => {
  const { rows } = await knex.raw(
    `
      select
        playlists.*
        , (
            select media_links.thumbnail_url
            from media_links
            where media_links.playlist_id = playlists.id
            limit 1
          ) as image
        , count(media_links) as links_count
      from playlists
      left join media_links on media_links.playlist_id = playlists.id
      where playlists.id = :id
      group by playlists.id, playlists.name, playlists.user_id, playlists.date_added
    `,
    { id }
  );
  return rows;
};

const updateCurrentPlaylist = async (id, body) => {
  await knex("playlists").update(body).where("id", id);
  const playlist = await getPlaylistByPlaylistId(id);

  return playlist;
};

const deletePlaylistById = async (id) =>
  await knex("playlists").del().where("id", id);

module.exports = {
  getAllPlaylists,
  createPlaylist,
  getPlaylistByUser,
  getPlaylistByPlaylistId,
  updateCurrentPlaylist,
  deletePlaylistById,
  getYoutubePlaylists,
};
