import React from 'react';
import './styles/App.scss';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';

//React Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Components
import NavBar from './components/layout/navbar/NavBar';
import Sidebar from './components/layout/sidebar/Sidebar';
import Footer from './components/layout/footer/Footer';

import CharactersList from './components/characters/CharactersList';
import SingleCharacter from './components/characters/SingleCharacter';

import ComicsList from './components/comics/ComicsList';
import SingleComic from './components/comics/SingleComic';

import StoriesList from './components/stories/StroriesList';
import SingleStory from './components/stories/SingleStory';


const App = () => (
  <Provider store={store}>
    <Router>
      <NavBar />
      <Sidebar />
      <div id="main" className="container-fluid">
        <Switch>
          <Route exact path="/" component={CharactersList} />
          <Route exact path="/characters" component={CharactersList} />
          <Route exact path="/comics" component={ComicsList} />
          <Route exact path="/stories" component={StoriesList} />
          <Route exact path="/character/:char_id" component={SingleCharacter} />
          <Route exact path="/comic/:comic_id" component={SingleComic} />
          <Route exact path="/story/:story_id" component={SingleStory} />
        </Switch>
      </div>
      <Footer />
    </Router>
  </Provider>
);

export default App;
