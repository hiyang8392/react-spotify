import { createSlice } from "@reduxjs/toolkit";
import { displayTime } from "../helpers";

const initCollection = {
  songs: [],
  songsTotalSecond: 0,
  songsTotalTime: '',
};

const collection = createSlice({
  name: 'collection',
  initialState: initCollection,
  reducers: {
    toggleCollection(state, action) {
      const song = action.payload;
      const songId = song.id;
      const existSong = state.songs.find((song) => {
        return song.id === songId;
      });

      if (existSong) {
        state.songs = state.songs.filter((song) => {
          return song.id !== existSong.id;
        });
        state.songsTotalSecond -= parseInt(song.time);
      } else {
        state.songs.unshift(song);
        state.songsTotalSecond += parseInt(song.time);
      }

      if (state.songsTotalSecond === 0) {
        state.songsTotalTime = '';
      } else {
        state.songsTotalTime = displayTime(state.songsTotalSecond, 'list');
      }
    },
  }
});

export const collectionActions = collection.actions;
export default collection;
