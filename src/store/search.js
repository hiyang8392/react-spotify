import { createSlice } from "@reduxjs/toolkit";
import dummyAlbums from "../data/albums";
import dummySongs from "../data/songs";

const initSearch = {
  isExistData: false,
  songs: [],
  albums: [],
};

const search = createSlice({
  name: 'search',
  initialState: initSearch,
  reducers: {
    searchData(state, action) {
      state.isExistData = false;
      state.songs = [];
      state.albums = [];

      if (!action.payload) {
        return;
      }

      const searchKeyWord = action.payload.toLowerCase();  
      const searchAlbums = dummyAlbums.filter((album) => {
        return (
          album.title.toLowerCase().search(searchKeyWord) !== -1 ||
          album.info.toLowerCase().search(searchKeyWord) !== -1
        );
      });

      const searchSongs = dummySongs.filter((song) => {
        return (
          song.title.toLowerCase().search(searchKeyWord) !== -1 ||
          song.artist.toLowerCase().search(searchKeyWord) !== -1
        );
      });

      if (searchAlbums.length > 0 || searchSongs.length > 0) {
        state.isExistData = true;
        state.albums = searchAlbums;
        state.songs = searchSongs;
      }
    },
  }
});

export const searchActions = search.actions;
export default search;
