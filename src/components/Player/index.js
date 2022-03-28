import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../../store/player";
import ReactPlayer from "react-player/youtube";
import styled from "styled-components";
import SongData from "./SongData";
import PlayerControl from "./PlayerControl";
import ProgressControl from "./ProgressControl";
import VolumeControl from "./VolumeControl";

const StyledFooter = styled.footer`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
  padding: 15px 25px 5px;
  border-top: 1px solid #282828;
  width: 100vw;
  background-color: #181818;
  height: 80px;

  svg {
    fill: #b3b3b3;

    :hover,
    :active {
      fill: #fff;
    }
  }

  .player-body {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    .react-player {
      position: absolute;
      top: 0;
      z-index: -9999;
      visibility: hidden;
    }
  }
`;

const YOUTUBE_URL = 'https://www.youtube.com/watch?v=';

const Player = () => {
  const songRef = useRef();
  const dispatch = useDispatch();
  const playerState = useSelector((state) => state.player);
  const isPlaying = playerState.isPlaying;
  const volume = playerState.volume;
  const songData = playerState.songData;

  const handleSeekTo = (time) => {
    if (songData.id) {
      songRef.current.seekTo(time);
      dispatch(playerActions.updatePlayerSecond(time));
    }
  };

  const playerUrl = songData.id
    ? `${YOUTUBE_URL}${songData.id}`
    : `${YOUTUBE_URL}oUFJJNQGwhk`;

  return (
    <StyledFooter>
      <SongData />
      <div className="player-body">
        <ReactPlayer
          className="react-player"
          ref={songRef}
          url={playerUrl}
          playing={isPlaying}
          volume={volume}
          muted={volume === 0 ? true : false}
          onDuration={(e) => {
            if (songData.id) {
              dispatch(playerActions.getDuration(e));
            }
          }}
          onProgress={(e) => {
            if (songData.id) {
              dispatch(playerActions.updatePlayerSecond(e.playedSeconds));
            }
          }}
          onEnded={() => {
            dispatch(playerActions.playNextSong());
          }}
        />
        <PlayerControl />
        <ProgressControl onSeekTo={handleSeekTo} />
      </div>
      <VolumeControl />
    </StyledFooter>
  );
};

export default Player;
