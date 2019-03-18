import React from 'react';
import ReactDOM from 'react-dom';
import Award from './Award';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Award />, div);
  ReactDOM.unmountComponentAtNode(div);
});