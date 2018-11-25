import React from 'react';
import { shallow } from 'enzyme';
import Home from '../containers/Home';
import '../setupTest';

it('renders without crashing', () => {
  shallow(<Home />);
});
