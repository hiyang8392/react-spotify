import { createSlice } from "@reduxjs/toolkit";
import dummyRecommends from "../data/recommends";
import dummyAlbums from "../data/albums";
import dummyPlayList from "../data/playList";

const initRecommend = {
  recommends: [],
};

const recommend = createSlice({
  name: 'recommend',
  initialState: initRecommend,
  reducers: {
    getRecommends(state) {
      const newRecommends = dummyRecommends.map((recommend) => {
        let items = dummyAlbums;
        if (recommend.type === 'playlist') {
          items = dummyPlayList;
        }

        const newItems = recommend.itemIds.map((id) => {
          return items.find((item) => {
            return item.id === id;
          });
        });

        return {
          id: recommend.id,
          image: recommend.image,
          title: recommend.title,
          info: recommend.info,
          type: recommend.type,
          items: newItems,
        };
      });

      state.recommends = newRecommends;
    },
  }
});

export const recommendActions = recommend.actions;
export default recommend;
