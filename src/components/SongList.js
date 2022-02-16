import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../store/player";
import styled from "styled-components";
import Song from "./Song";

const StyledSection = styled.section`
  .banner {
    display: flex;
    align-items: flex-end;
    margin-bottom: 30px;
    width: 70vw;

    .cover {
      margin-right: 20px;
      width: 180px;
      height: 180px;

      img {
        border-radius: 4px;
        width: 180px;
        height: 180px;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: end;
      color: #fff;

      .type,
      .title,
      .text {
        margin-bottom: 10px;
      }

      .title {
        font-size: 48px;
      }

      .text {
        font-size: 16px;
        color: #7e7e7e;
      }

      .create-info {
        display: flex;
        align-items: center;
        color: #b3b3b3;

        .play-btn {
          padding: 5px 20px;
          margin-left: 10px;
          border: 0;
          border-radius: 20px;
          background-color: #1fdf64;
          cursor: pointer;

          :hover {
            background-color: #1ed760;
            transform: scale(1.03);
          }

          :active {
            transform: scale(1.05);
          }
        }
      }
    }
  }

  .song-list {
    display: flex;
    flex-direction: column;
    font-size: 14px;

    .song-hash {
      width: 4%;
    }

    .song-title {
      width: 42%;
    }

    .song-album {
      width: 40%;
    }

    .song-collection {
      width: 3%;
    }

    .song-time {
      text-align: center;
      width: 11%;
    }

    .head {
      display: flex;
      margin-bottom: 20px;
      border-bottom: 1px solid rgba(255,255,255,.1);
      color: #b3b3b3;
      height: 100%;
      padding: 0 16px 10px;
    }
  }
`;

const SongList = (props) => {
  const dispatch = useDispatch();
  const songList = useSelector((state) => state.songList);
  const collectionSongs = useSelector((state) => state.collection.songs);
  const songsTotalTime = useSelector((state) => state.collection.songsTotalTime);
  const isTypeCollection = props.type === 'collection' ? true : false;

  let songs = collectionSongs;
  let songsCount = collectionSongs.length;
  let displaySongTime = songsTotalTime;
  let imageURL = `/assets/images/collection/collection.jpg`;
  let displayListType = '播放清單';
  let listTitle = '已收藏歌曲';
  let listDesc = '';

  if (!isTypeCollection) {
    songs = songList.songs;
    listTitle = songList.data.title;
    listDesc = songList.data.info;
    songsCount = songList.songsCount;
    displaySongTime = songList.songsTotalTime;
  }

  if (props.type === 'playList') {
    imageURL = `/assets/images/playlist/${songList.data.image}.jpg`;
  } else if (props.type === 'album') {
    imageURL = `/assets/images/albums/${songList.data.image}.jpg`;
    displayListType = '專輯';
  }

  const SongItem = songs.map((song) => {
    const isExistCollectionSong = collectionSongs.find((collectionSong) => {
      return collectionSong.id === song.id;
    });

    return (
      <Song
        key={song.id}
        id={song.id}
        image={song.image}
        title={song.title}
        artist={song.artist}
        album={song.album}
        time={song.time}
        songs={songs}
        isCollectionSong={isExistCollectionSong ? true : false}
      />
    );
  });

  let createInfo = '0 首歌';
  if (songsCount) {
    createInfo = `${songsCount} 首歌, ${displaySongTime}`;
  }

  const handleTogglePlaying = () => {
    if (songs.length === 0) {
      return;
    }

    const updateSong = { 
      id: songs[0].id,
      image: songs[0].image,
      title: songs[0].title,
      artist: songs[0].artist,
    };

    dispatch(playerActions.updatePlayerSong(updateSong));
    dispatch(playerActions.updateSongList(songs));
  };

  return (
    <StyledSection>
      <div className="banner">
        <div className="cover">
          <img src={imageURL} alt="cover" />
        </div>
        <div className="info">
          <div className="type">{displayListType}</div>
          <div className="title">{listTitle}</div>
          <div className="text">{listDesc}</div>
          <div className="create-info">
            <span>{createInfo}</span>
            <button className="play-btn" onClick={handleTogglePlaying}>PLAY</button>
          </div>
        </div>
      </div>
      <ul className="song-list">
        <li className="head">
          <div className="song-hash"></div>
          <div className="song-title">標題</div>
          <div className="song-album">專輯</div>
          <div className="song-collection"></div>
          <div className="song-time">時間</div>
        </li>
        {SongItem}
      </ul>
    </StyledSection>
  );
};

export default SongList;
