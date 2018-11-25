import React, { Component } from 'react';
import './App.scss';
import Home from './containers/Home';
import plus from './static/add.svg';
import logo from './static/logo.png';
import { actionsTypes, dispatchAction } from './actions/actions';
import 'react-notifications/lib/notifications.css';

class App extends Component {
  createNewNoteAction() {
    dispatchAction(actionsTypes.CREATE_NEW_NOTE);
  }
  render() {
    return (
      <div className="app">
        <header className="header">
          <span>
            <img alt="Notes App" src={logo} className="app-logo" />
          </span>
          <span className="app-title">Note app</span>
          <div className="button-create" onClick={this.createNewNoteAction}>
            <span>
                     <img src={plus} alt="create new note" />
            </span>
            create
          </div>
        </header>
        <Home />
      </div>
    );
  }
}

export default App;
