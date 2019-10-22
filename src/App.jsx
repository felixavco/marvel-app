import React, { lazy } from "react";
import Layout from "./components/Layout";
import { Switch, Route, Redirect } from "react-router-dom";
import "./styles/App.scss";
const Home = lazy(() => import("./pages/Home"));
const Characters = lazy(() => import("./pages/Characters"));
const SingleCharacter = lazy(() => import("./pages/Characters/SingleCharacter"));
const SearchResults = lazy(() => import("./pages/Characters/SearchResults"));
const ComicsList = lazy(() => import("./pages/Comics"));
const SingleComic = lazy(() => import("./pages/Comics/SingleComic"));
const StoriesList = lazy(() => import("./pages/Stories"));
const SingleStory = lazy(() => import("./pages/Stories/SingleStory"));
const ErrorPage = lazy(() => import("./pages/errorPages/ErrorPage")) ;
const NotFound  = lazy(() => import("./pages/errorPages/NotFound"));

const App = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/characters" component={Characters} />
      <Route exact path="/search-results" component={SearchResults} />
      <Route exact path="/comics" component={ComicsList} />
      <Route exact path="/stories" component={StoriesList} />
      <Route exact path="/character/:char_id" component={SingleCharacter} />
      <Route exact path="/comic/:comic_id" component={SingleComic} />
      <Route exact path="/story/:story_id" component={SingleStory} />
      <Route exact path="/error-page" component={ErrorPage} />
      <Route exact path="/page-not-found" component={NotFound} />
      <Redirect to="/page-not-found" />
    </Switch>
  </Layout>
);

export default App;
