import { useSelector } from "react-redux";
import Item from "../components/Item";
import styled from "styled-components";

const StyledSearch = styled.div`
  color: #fff;

  h1 {
    font-size: 32px;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 24px;
    margin-bottom: 16px;
  }

  .items {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
  }

  @media (max-width: 500px) {
    h2 {
      font-size: 20px;
    }

    .items {
      flex-wrap: initial;
      overflow-x: scroll;
    }
  }
`;

const Search = () => {
  const searchState = useSelector((state) => state.search);
  const songs = searchState.songs;
  const albums = searchState.albums;

  const songItems = songs.map((item) => {
    return (
      <Item 
        key={`${item.id}`}
        id={item.albumId}
        type="album"
        image={item.image}
        title={item.title}
        info={item.artist}
      />
    );
  });

  const albumItems = albums.map((item) => {
    return (
      <Item
        key={`${item.id}`}
        id={item.id}
        type="album"
        image={item.image}
        title={item.title}
        info={item.info}
      />
    );
  });

  return (
    <StyledSearch>
      <h1>搜尋結果</h1>
      {songs.length > 0 && (
        <>
          <h2>歌曲</h2>
          <ul className="items">{songItems}</ul>
        </>
      )}
      
      {albums.length > 0 && (
        <>
          <h2>專輯</h2>
          <ul className="items">{albumItems}</ul>
        </>
      )}
    </StyledSearch>
  )
};

export default Search;
