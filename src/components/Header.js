import { useHistory, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import styled from "styled-components";
import SearchInput from "./SearchInput";

const StyledHeader = styled.div`
  position: sticky;
  display: flex;
  top: 0;
  padding: 10px 25px 0;
  align-items: center;
  z-index: 10000;
  background-color: #121212;
  height: 80px;

  .page-control {
    display: flex;

    .prev-button {
      border: none;
      background-color: #121212;
      margin-right: 20px;
      cursor: pointer;

      svg {
        fill: #b3b3b3;
        width: 26px;
        height: 26px;
      }

      :hover {
        svg {
          transform: scale(1.05);
          fill: #fff;
        }
      }

      :active {
        transform: scale(1.07);
      }
    }
  }
`;

const Header = () => {
  const history = useHistory();
  const location = useLocation();

  const handlePrevPage = () => {
    history.goBack();
  };

  return (
    <StyledHeader>
      <div className="page-control">
        <button className="prev-button" onClick={handlePrevPage}>
          <FaArrowLeft />
        </button>
      </div>
      {location.pathname === '/search' && <SearchInput />}
    </StyledHeader>
  );
};

export default Header;
