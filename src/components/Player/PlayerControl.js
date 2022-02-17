import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../../store/player";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";
import styled from "styled-components";

const StyledControl = styled.div`
  display: flex;
  margin-bottom: 5px;

  .prev,
  .next,
  .playing {
    cursor: pointer;
    border: 0;
    background-color: #181818;

    :hover {
      transform: scale(1.2);
    }

    :active {
      transform: scale(1.3);
    }
  }

  .playing {
    margin: 0 50px;
  }

`;

const PlayerControl = () => {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const songData = useSelector((state) => state.player.songData);
  let playingIcon = <FaPlay />;

  if (isPlaying) {
    document.title = `${songData.title} - ${songData.artist} | React Spotify`;
    playingIcon = <FaPause />;
  }

  const handleTogglePlaying = () => {
    if (songData.id) {
      dispatch(playerActions.togglePlaying());
    }
  };

  const handlePlayPrevSong = () => {
    if (songData.id) {
      dispatch(playerActions.playPrevSong());
    }
  };

  const handlePlayNextSong = () => {
    if (songData.id) {
      dispatch(playerActions.playNextSong());
    }
  };

  document.body.onkeyup = (e) => {
    if(e.key === ' '){
      handleTogglePlaying();
    }
  }

  return (
    <StyledControl>
      <button className="prev" onClick={handlePlayPrevSong}>
        <FaStepBackward />
      </button>
      <button className="playing" onClick={handleTogglePlaying}>
        {playingIcon}
      </button>
      <button className="next" onClick={handlePlayNextSong}>
        <FaStepForward />
      </button>
    </StyledControl>
  );
};

export default React.memo(PlayerControl);
