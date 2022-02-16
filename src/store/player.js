import { createSlice } from "@reduxjs/toolkit";
import { displayTime } from "../helpers";

const initPlayer = {
  isPlaying: false,
  progressPercent: 0,
  volume: 0.5,
  duration: 0,
  startTime: '00:00',
  endTime: '00:00',
  songData: {
    id: '',
    image: '',
    title: '',
    artist: '',
  },
  songs: [],
};

const updateProgressPercent = (remainTime, totalTime) => {
  return (remainTime / totalTime) * 100;
}

const player = createSlice({
  name: 'player',
  initialState: initPlayer,
  reducers: {
    updatePlayerSong(state, action) {
      const updateSongData = action.payload;

      state.isPlaying = true;
      state.startTime = initPlayer.startTime;
      state.progressPercent = initPlayer.progressPercent;
      state.songData = {
        id: updateSongData.id,
        image: updateSongData.image,
        title: updateSongData.title,
        artist: updateSongData.artist,
      };
    },
    updateSongList(state, action) {
      state.songs = action.payload;
    },
    togglePlaying(state) {
      state.isPlaying = !state.isPlaying;
    },
    getDuration(state, action) {
      state.duration = action.payload;
      state.endTime = displayTime(action.payload, 'song');
    },
    updatePlayerSecond(state, action) {
      state.startTime = displayTime(action.payload, 'song');
      state.progressPercent = updateProgressPercent(action.payload, state.duration);
    },
    updateVolume(state, action) {
      state.volume = action.payload / 100;
    },
    playNextSong(state) {
      const songs = state.songs;
      const songIndex = songs.findIndex((song) => {
        return song.id === state.songData.id;
      });

      if (songIndex === -1 || songs.length === 1) {
        return;
      }

      state.isPlaying = true;
      state.startTime = initPlayer.startTime;
      state.progressPercent = initPlayer.progressPercent;

      if (songIndex + 1 === songs.length) {
        state.songData = {
          id: songs[0].id,
          image: songs[0].image,
          title: songs[0].title,
          artist: songs[0].artist,
        };
        return;
      }

      state.songData = {
        id: songs[songIndex + 1].id,
        image: songs[songIndex + 1].image,
        title: songs[songIndex + 1].title,
        artist: songs[songIndex + 1].artist,
      };
    },
    playPrevSong(state) {
      const songs = state.songs;
      const songIndex = songs.findIndex((song) => {
        return song.id === state.songData.id;
      });

      if (songIndex === 0 || songIndex === -1) {
        console.log('last or null');
        return;
      }

      state.isPlaying = true;
      state.startTime = initPlayer.startTime;
      state.progressPercent = initPlayer.progressPercent;
      state.songData = {
        id: songs[songIndex - 1].id,
        image: songs[songIndex - 1].image,
        title: songs[songIndex - 1].title,
        artist: songs[songIndex - 1].artist,
      };
    },
  }
});

export const playerActions = player.actions;
export default player;
