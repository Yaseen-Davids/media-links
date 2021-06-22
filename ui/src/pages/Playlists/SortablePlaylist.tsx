import React, { useState } from "react";

import { ReactSortable } from "react-sortablejs";
// import styled from "styled-components";

import { PlaylistCard } from "../../components/PlaylistCard";

type SortablePlaylistProps = {
  playlists: any[];
  handleOpenPlaylist: (playlist: any) => void;
};

export const SortablePlaylist: React.FC<SortablePlaylistProps> = ({
  playlists,
  handleOpenPlaylist,
}: any) => {
  const [list, setList] = useState(playlists);

  return (
    <ReactSortable
      animation={200}
      delay={2}
      list={list}
      setList={setList}
      // onSort={(evt, sortable, store) => {
      //   console.log("evt", evt);
      //   console.log("sortable", sortable);
      //   console.log("store", store);
      // }}
      style={{
        display: "grid",
        marginTop: "30px",
        gap: "10px",
        gridTemplateColumns: "repeat(8, 1fr)",
      }}
    >
      {(list || []).map((playlist: any) => (
        <PlaylistCard
          title={playlist.name}
          imageSrc={playlist.image}
          linksCount={playlist.links_count}
          onClick={() => handleOpenPlaylist(playlist)}
        />
      ))}
    </ReactSortable>
  );
};
