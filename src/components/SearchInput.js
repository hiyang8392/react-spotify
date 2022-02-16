import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchActions } from "../store/search";
import styled from "styled-components";

const StyledSearchBar = styled.div`
  padding: 10px;

  input {
    padding: 6px 15px;
    border: 0;
    border-radius: 500px;
    width: 100%;
    height: 30px;
    text-overflow: ellipsis;
    color: #000;
  }
`;

const SearchInput = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search);
  const key = params.get('key');
  const [searchInput, setSearchInput] = useState(key || '');

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    if (!key) {
      dispatch(searchActions.searchData());
    }

    const timer = setTimeout(() => {
      const keyword = searchInput ? searchInput : key;
      dispatch(searchActions.searchData(keyword));
      if (keyword) {
        history.replace(`/search?key=${keyword}`);  
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    }
  }, [searchInput, dispatch, history, key]);

  return (
    <StyledSearchBar>
      <input name="search" placeholder="Search..." value={searchInput} onChange={handleSearchInput}/>
    </StyledSearchBar>
  );
};

export default SearchInput;
