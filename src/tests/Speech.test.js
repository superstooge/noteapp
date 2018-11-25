import React from 'react';
import { shallow } from 'enzyme';
import Speech from '../components/Speech';
import '../setupTest';
const noop = () => {};
const mockSpeechRecognition = function() {
  this.onspeechstart = noop;
  this.onspeechend = noop;
};
it('renders without crashing', () => {
  shallow(<Speech mockSpeechRecognition={mockSpeechRecognition} />);
});
