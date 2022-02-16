import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";

const StyledMain = styled.main`
  position: relative;
  float: right;
  width: 85%;
`;

const StyledLayout = styled.div`
  padding: 0 25px 100px;
`;

const Home = React.lazy(() => {
  return import("../pages/Home");
});

const Search = React.lazy(() => {
  return import("../pages/Search");
});

const PlayList = React.lazy(() => {
  return import("../pages/PlayList");
});

const Album = React.lazy(() => {
  return import("../pages/Album");
});

const Collection = React.lazy(() => {
  return import("../pages/Collection");
});

const Main = () => {
  return (
    <StyledMain>
      <Header />
      <StyledLayout>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/search" exact component={Search} />
            <Route path="/collection" exact component={Collection} />
            <Route path="/playlist/:playListId" exact component={PlayList} />
            <Route path="/album/:albumId" exact component={Album} />
            <Route path="*" component={Home} />
          </Switch>
        </Suspense>
      </StyledLayout>
    </StyledMain>
  )
};

export default Main;
