import { createSlice } from "@reduxjs/toolkit";
import { displayTime } from "../helpers";
import dummyPlayList from "../data/playList";
import dummyAlbums from "../data/albums";
import dummySongs from "../data/songs";

const initSongList = {
  data: {},
  songs: [],
  songsCount: 0,
  songsTotalTime: 0,
};

const songList = createSlice({
  name: 'songList',
  initialState: initSongList,
  reducers: {
    getSongListData(state, action) {
      const listType = action.payload.type;
      const listId = action.payload.id;
      let listData = [];
      let songs = [];

      if (listType === 'album') {
        listData = dummyAlbums.find((album) => {
          return album.id === listId;
        });

        songs = dummySongs.filter((song) => {
          return song.albumId === listId;
        });
      } else {
        listData = dummyPlayList.find((playlist) => {
          return playlist.id === listId;
        });

        songs = listData.songIds.map((songId) => {
          return dummySongs.find((song) => {
            return song.id === songId;
          });
        });
      }

      const songTotalSecond = songs.reduce((sum, song) => {
        return sum += parseInt(song.time);
      }, 0);

      state.data = {
        id: listData.id,
        image: listData.image,
        title: listData.title,
        info: listData.info,
      };
      state.songs = songs;
      state.songsCount = songs.length;
      state.songsTotalTime = displayTime(songTotalSecond, 'list');
    },
  }
});

export const songListActions = songList.actions;
export default songList;
