import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../../store/player";
import { FaVolumeUp, FaVolumeDown, FaVolumeMute } from "react-icons/fa";
import styled from "styled-components";

const StyledControl = styled.div`
  .volume-btn {
    border: 0;
    background-color: #181818;
  }

  svg {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const VolumeControl = () => {
  const dispatch = useDispatch();
  const volume = useSelector((state) => state.player.volume);
  let volumeIcon = <FaVolumeDown />;

  if (volume === 0) {
    volumeIcon = <FaVolumeMute />;
  } else if (volume >= 0.7) {
    volumeIcon = <FaVolumeUp />;
  }

  const handleUpdateVolume = (e) => {
    dispatch(playerActions.updateVolume(e.target.value));
  };

  return (
    <StyledControl>
      <button className="volume-btn">{volumeIcon}</button>
      <input type="range" min="0" max="100" className="volume" onChange={handleUpdateVolume} value={volume * 100} />
    </StyledControl>
  );
};

export default React.memo(VolumeControl);
