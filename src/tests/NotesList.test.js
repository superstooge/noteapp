import React from 'react';
import { shallow, mount } from 'enzyme';
import NotesList from '../components/NotesList';
import '../setupTest';
import configureStore from 'redux-mock-store';
import NoteButton from '../components/NoteButton';
const initialState = {
  currentNote: { id: 1 },
  notes: [{ id: 1, title: 'one' }, { id: 2, title: 'two' }]
};
const mockStore = configureStore();
let store;
beforeEach(() => {
  store = mockStore(initialState);
});
it('renders without crashing', () => {
  shallow(<NotesList store={store} />);
});
it('lists the correct number of notes', () => {
  const component = mount(<NotesList store={store} />);
  expect(component.find(NoteButton)).toHaveLength(initialState.notes.length);
});
