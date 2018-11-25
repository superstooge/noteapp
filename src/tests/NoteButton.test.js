import React from 'react';
import { shallow } from 'enzyme';
import NoteButton from '../components/NoteButton';
import '../setupTest';
const defaultProps = {
  title: 'test',
  id: 5
};
it('renders without crashing', () => {
  shallow(<NoteButton {...defaultProps} />);
});
