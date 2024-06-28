import React from 'react';
import ReactDOM from 'react-dom';
import Post from './Post';
import {createRoot} from "react-dom/client";

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<Post />);
  root.unmount();
});
