import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const StyledControl = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  width: 180px;

  .album {
    margin-right: 15px;

    img {
      width: 52px;
      height: 52px;
    }

    @media (max-width: 500px) {
      display: none;
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
      color: #fff;
    }

    .artist {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #b3b3b3;
      font-size: 11px;
    }
  }

  @media (max-width: 500px) {
    width: 20vw;
  }
`;

const SongData = () => {
  const songData = useSelector((state) => state.player.songData);
  let imageURL = `/assets/images/albums/${songData.image}.jpg`;

  return (
    <StyledControl>
      <div className="album">
        {songData.image ? (<img src={imageURL} alt="album" />) : ''}
      </div>
      <div className="info">
        <span className="title">{songData.title}</span>
        <span className="artist">{songData.artist}</span>
      </div>
    </StyledControl>
  );
};

export default React.memo(SongData);
