import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { songListActions } from "../store/songList";
import SongList from "../components/SongList";

const PlayList = () => {
  const params = useParams();
  const playListId = params.playListId;
  const dispatch = useDispatch();
  const playList = useSelector((state) => state.songList);

  const playListInfo = {
    id: playListId,
    type: 'playList',
  };

  if (playList.data.id !== playListId) {
    dispatch(songListActions.getSongListData(playListInfo));
  }

  return (
    <SongList type='playList' />
  );
};

export default PlayList;
