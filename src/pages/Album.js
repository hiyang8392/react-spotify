import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { songListActions } from "../store/songList";
import SongList from "../components/SongList";

const Album = () => {
  const params = useParams();
  const albumId = params.albumId;
  const dispatch = useDispatch();
  const album = useSelector((state) => state.songList);

  const albumInfo = {
    id: albumId,
    type: 'album',
  };

  if (album.data.id !== albumId) {
    dispatch(songListActions.getSongListData(albumInfo));
  }

  return (
    <SongList type='album' />
  );
};

export default Album;
