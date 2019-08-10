import React from 'react';
import './styles/App.scss';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';

//React Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Components
import NavBar from './components/layout/navbar/NavBar';
import CharactersList from './components/characters/CharactersList';
import SingleCharacter from './components/singleCharacter/SingleCharacter';
import SingleComic from './components/singleComic/SingleComic';
import Footer from './components/layout/footer/Footer';

const App = () => (
  <Provider store={store}>
    <Router>
      <NavBar />
        <div id="main" className="container-fluid">
            <Switch>
              <Route exact path="/" component={CharactersList} />
              <Route exact path="/character/:char_id" component={SingleCharacter} />
              <Route exact path="/comic/:comic_id" component={SingleComic} />
            </Switch>
        </div>
      <Footer />
    </Router>
  </Provider>
);

export default App;
