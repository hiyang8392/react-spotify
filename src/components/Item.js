import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLi = styled.li`
  margin: 0 20px 15px 0;
  border-radius: 10px;
  width: 200px;
  background-color: #181818;
  cursor: pointer;

  :hover {
    background-color: #282828;
  }

  .item {
    .item-image {
      padding: 20px 20px 0;

      img {
        border-radius: 4px;
        width: 160px;
        height: 160px;
      }
    }

    .item-data {
      padding: 0 10px;
      margin: 5px 10px 5px 0;
      min-height: 60px;
      overflow: hidden;

      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #fff;
        font-size: 16px;
      }

      .desc {
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        overflow: hidden;
        margin-top: 4px;
        font-size: 14px;
        color: #b3b3b3;
      }
    }
  }
`;

const Item = (props) => {
  let imageURL = `/assets/images/albums/${props.image}.jpg`;
  if (props.type === 'playlist') {
    imageURL = `/assets/images/playlist/${props.image}.jpg`;
  }

  return (
    <StyledLi>
      <Link to={`/${props.type}/${props.id}`}>
        <div className="item">
          <div className="item-image">
            <img src={imageURL} alt="item" />
          </div>
          <div className="item-data">
            <div className="title">{props.title}</div>
            <div className="desc">{props.info}</div>
          </div>
        </div>
      </Link>
    </StyledLi>
  );
};

export default Item;
