import React from 'react';
import ReactDOM from 'react-dom';
import Awards from './Awards';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Awards />, div);
  ReactDOM.unmountComponentAtNode(div);
});
