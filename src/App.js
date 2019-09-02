import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Header from './components/Header';
import Home from './components/Home';
import Game from './components/Game';

library.add(faChevronLeft)

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={(Home)} />
            <Route exact path="/home" component={(Home)} />
            <Route exact path="/playgame" component={(Game)} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
