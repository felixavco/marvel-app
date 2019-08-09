import React from 'react';
import './styles/App.scss';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';

//React Router
import { BrowserRouter as Router } from 'react-router-dom';

//Components
import NavBar from './components/layout/navbar/NavBar';
import Footer from './components/layout/footer/Footer';

const App = () => (
  <Provider store={store}>
    <Router>
      <NavBar />
      <h1>Marvel App</h1>
      <Footer />
    </Router>
  </Provider>
);

export default App;
