import { configureStore } from "@reduxjs/toolkit";
import player from "./player";
import recommend from "./recommend";
import songList from "./songList";
import collection from "./collection";
import search from "./search";
import ui from "./ui";

const store = configureStore({
  reducer: {
    player: player.reducer,
    recommend: recommend.reducer,
    songList: songList.reducer,
    collection: collection.reducer,
    search: search.reducer,
    ui: ui.reducer,
  },
});

export default store;
