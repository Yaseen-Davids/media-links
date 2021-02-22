const axios = require("axios");
const knex = require("../knex");

const youtubeAPIKEY = process.env.YOUTUBE_API_KEY;
const youtubeURL = "https://youtube.googleapis.com/youtube/v3/playlistItems";

const getYoutubePlaylistItems = async (list, playlistId, token, youtube_id) => {
  const result = await axios.get(`${youtubeURL}?part=snippet,contentDetails&pageToken=${token}&maxResults=100&playlistId=${youtube_id}&key=${youtubeAPIKEY}`);

  for (let i = 0; i < result.data.items.length; i++) {
    const item = result.data.items[i];
    list.push({
      title: item.snippet.title,
      thumbnail_url: item.snippet.thumbnails.medium.url,
      author_url: `https://www.youtube.com/watch?v=${item.contentDetails.videoId}`,
      removed: 0,
      user_id: -99,
      date_added: new Date(),
      provided_name: "YouTube",
      playlist_id: playlistId,
      author_name: item.snippet.videoOwnerChannelTitle,
    });
  }

  if (result.data.nextPageToken) {
    const nextPageToken = result.data.nextPageToken;
    await getYoutubePlaylistItems(list, playlistId, nextPageToken, youtube_id);
  }
  return;
};

const createPlaylist = async (youtubePlaylist) => {
  const createPlaylistId = await knex("playlists").insert({ name: youtubePlaylist.name, user_id: -99, date_added: new Date() }).returning("id");
  const videoLinks = [];

  await getYoutubePlaylistItems(videoLinks, createPlaylistId[0], "", youtubePlaylist.youtube_id);

  await knex("media_links").insert(videoLinks);

  return;
};

const getYoutubePlaylists = async () => await knex.select("*").from("youtube_playlists");

const deleteYoutubePlaylists = async () => await knex("playlists").where("user_id", -99).del();

const updatePlaylists = async () => {
  await deleteYoutubePlaylists(); // delete youtube playlists

  const youtubePlaylists = await getYoutubePlaylists(); // youtube playlists

  for (let i = 0; i < youtubePlaylists.length; i++) {
    await createPlaylist(youtubePlaylists[i]); // create playlists
  }

  return;
};

module.exports = {
  updatePlaylists,
};
