import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FaHome, FaSearch, FaList, FaSpotify } from "react-icons/fa";

const Nav = styled.nav`
  position: fixed;
  padding: 20px;
  width: 15%;
  height: 100vh;
  border: 1px solid #000;
  background-color: #000;
  font-size: 14px;

  svg {
    margin-right: 5px;
    width: 20px;
    height: 20px;
  }

  ul {
    margin: 10px 0;
    li {
      padding: 10px 0;

      a {
        display: flex;
        color: #b3b3b3;

        :hover,
        :active,
        &.active {
          color: #fff;
        }
      }
    }
  }

  .banner {
    margin-bottom: 20px;

    a {
      display: flex;
      align-items: center;
    }

    svg {
      fill: #fff;
    }

    .title {
      color: #fff;
      font-size: 20px;
    }
  }

  .line {
    background-color: #282828;
    height: 1px;
    min-height: 1px;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <div className="banner">
        <NavLink to="/" exact>
          <FaSpotify/>
          <span className="title">Hi Yang</span>
        </NavLink>
      </div>
      <ul>
        <li>
          <NavLink to="/" exact><FaHome /><span>首頁</span></NavLink>
        </li>
        <li>
          <NavLink to="/search" exact ><FaSearch /><span>搜尋</span></NavLink>
        </li>
        <li>
          <NavLink to="/collection" exact><FaList /><span>你的音樂庫</span></NavLink>
        </li>
      </ul>
      <div className="line"></div>
      {/* <div className="playlist">
        <ul>
          <li>
            <NavLink to="/playlist" exact><span>每週新發現</span></NavLink>
          </li>
        </ul>
      </div> */}
    </Nav>
  );
};

export default Navbar;
