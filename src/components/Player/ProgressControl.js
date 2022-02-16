import { useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const StyledControl = styled.div`
  display: flex;
  align-items: center;

  .start-time,
  .end-time {
    text-align: center;
    width: 40px;
    color: #b3b3b3;
    font-size: 11px;
  }

  .song-progress {
    margin: 0 5px;
    width: 40vw;
    height: 5px;
    border-radius: 25px;
    background-color: #404040;
    color: #b3b3b3;
    cursor: pointer;
  }

  progress::-webkit-progress-bar {
    border-radius: 4px;
    background-color: #535353;
  }

  progress::-webkit-progress-value {
    border-radius: 4px;
    background-color: #b3b3b3;
  }
`;

const ProgressControl = (props) => {
  const songProgressRef = useRef();
  const startTime = useSelector((state) => state.player.startTime);
  const endTime = useSelector((state) => state.player.endTime);
  const progressPercent = useSelector((state) => state.player.progressPercent);
  const duration = useSelector((state) => state.player.duration);

  const handleUpdateProgress = (e) => {
    let position = e.pageX - songProgressRef.current.offsetLeft;
    position = position <= 0 ? 0 : position;
    const clickedValue = (position * songProgressRef.current.max) / songProgressRef.current.offsetWidth;
    const time = (clickedValue / 100) * duration;
    props.onSeekTo(time);
  }

  return (
  <StyledControl>
    <div className="start-time">{startTime}</div>
    <progress
      ref={songProgressRef}
      className="song-progress"
      max="100"
      value={progressPercent}
      onClick={handleUpdateProgress}
    />
    <div className="end-time">{endTime}</div>
  </StyledControl>
  );
};

export default ProgressControl;
