import React from 'react';
import ReactDOM from 'react-dom';
import Players from './Players';
import {createRoot} from "react-dom/client";

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<Players />);
  root.unmount();
});
