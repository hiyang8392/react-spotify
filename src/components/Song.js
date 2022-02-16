import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../store/player";
import { collectionActions } from "../store/collection";
import { ShowToast } from "../store/ui";
import { FaRegPlayCircle, FaPauseCircle, FaRegHeart, FaHeart } from "react-icons/fa";
import styled from "styled-components";
import { displayTime } from "../helpers";

const SongLi = styled.li`
  display: flex;
  align-items: center;
  padding: 0 16px;
  margin-bottom: 10px;
  border: 1px solid transparent;
  height: 56px;
  color: #b3b3b3;
  font-size: 14px;

  .song-title {
    display: flex;

    .album {
      margin-right: 20px;

      img {
        width: 40px;
        height: 40px;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: ${props => (props['playing-song-id'] === props['item-id'] ? '#1ed760' : '#fff')};
        font-size: 16px;
      }
    }
  }

  .song-hash {
    position: relative;

    .playing-btn {
      border: 0;
      background-color: #121212;
      opacity: ${props => ((props['playing-song-id']) === props['item-id'] ? 1 : 0)};
      cursor: pointer;

      svg {
        width: 24px;
        height: 24px;
        fill: ${props => (props['playing-song-id'] === props['item-id'] ? '#1ed760' : '#fff')};
      }
    }  
  }

  .song-album {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${props => (props['playing-song-id'] === props['item-id'] ? '#1ed760' : '#b3b3b3')};
  }

  .song-collection {
    display: flex;
    color: ${props => (props['playing-song-id'] === props['item-id'] ? '#1ed760' : '#b3b3b3')};
    cursor: pointer;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  .song-time {
    color: ${props => (props['playing-song-id'] === props['item-id'] ? '#1ed760' : '#fff')};
  }

  &:hover {
    background-color: rgba(255,255,255,.1);
    border-radius: 4px;

    :active {
      background-color: rgba(255,255,255,.13);
    }

    .playing-btn {
      background-color: transparent;
      opacity: 1;

      &:hover {
        transform: scale(1.05);
      }
      &:active {
        transform: scale(1.1);
      }
    }
  }
`;

const ADD_COLLECTION_MESSAGE = '已新增到你的音樂庫';
const REMOVE_COLLECTION_MESSAGE = '已從你的音樂庫移除';

const Song = (props) => {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const playerSongData = useSelector((state) => state.player.songData);
  const toast = useSelector((state) => state.ui.toast);
  const { id, image, album, title, artist, time, songs, isCollectionSong } = props;
  const songTime = displayTime(time, 'song');

  let imageURL = `/assets/images/albums/${image}.jpg`;
  let playingStatusIcon = <FaRegPlayCircle />;
  let collectionIcon = <FaRegHeart />;

  if (id === playerSongData.id && isPlaying) {
    playingStatusIcon = <FaPauseCircle />;
  }
  if (isCollectionSong) {
    collectionIcon = <FaHeart />;
  }

  const [isExecuting, setIsExecuting] = useState(false);

  const handleTogglePlaying = () => {
    if (isExecuting) {
      return;
    }
    setIsExecuting(true);

    if (id === playerSongData.id) {
      dispatch(playerActions.togglePlaying());
      return;
    }

    const updateSong = { id, image, title, artist };
    dispatch(playerActions.updatePlayerSong(updateSong));
    dispatch(playerActions.updateSongList(songs));
  };

  const handleToggleCollection = () => {
    const songData = { id, image, album, title, artist, time };
    dispatch(collectionActions.toggleCollection(songData));
    if (!toast.isClick) {
      if (isCollectionSong) {
        dispatch(ShowToast(REMOVE_COLLECTION_MESSAGE));
      } else {
        dispatch(ShowToast(ADD_COLLECTION_MESSAGE));
      } 
    }
  };

  useEffect(() => {
    if (isExecuting) {
      setTimeout(() => {
        setIsExecuting(false);
      }, 500);
    }
  }, [isExecuting]);

  return (
    <SongLi item-id={id} playing-song-id={playerSongData.id} is-playing={isPlaying}>
      <div className="song-hash">
        <button className="playing-btn" onClick={handleTogglePlaying}>
          {playingStatusIcon}
        </button>
      </div>
      <div className="song-title">
        <div className="album">
          <img src={imageURL} alt="album" />
        </div>
        <div className="info">
          <span className="title">{title}</span>
          <span className="artist">{artist}</span>
        </div>
      </div>
      <div className="song-album">{album}</div>
      <div className="song-collection" onClick={handleToggleCollection}>
        {collectionIcon}
      </div>
      <div className="song-time">{songTime}</div>
    </SongLi>
  );
};

export default Song;
