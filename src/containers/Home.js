import React, { Fragment } from 'react';
import NotesList from '../components/NotesList';
import NoteEditor from '../components/NoteEditor';
import { NotificationContainer } from 'react-notifications';
import Speech from '../components/Speech';
const Home = () => {
  return (
    <Fragment>
      <div className="home">
        <NotesList />
        <NoteEditor />
        <Speech />
      </div>
      <NotificationContainer />
    </Fragment>
  );
};

export default Home;
