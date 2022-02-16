import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Player from "./components/Player";

import Toast from "./components/UI/Toast";

const StyledMobile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .message {
    color: #fff;
    font-size: 24px;
  }
`;

// const ua = navigator.userAgent;
// const isMobile =
//   /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/.test(ua);
const isMobile = false;

function App() {
  return (
    <>
      {isMobile ? (
        <StyledMobile>
          <p className="message">Sorry! 尚未支援手機 😢</p>
        </StyledMobile>
      ) : (
        <BrowserRouter>
          <Navbar />
          <Main />
          <Player />
        </BrowserRouter>
      )}
      <Toast />
    </>
  );
}

export default App;
