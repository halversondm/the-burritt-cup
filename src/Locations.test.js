import React from 'react';
import ReactDOM from 'react-dom';
import Locations from './Locations';
import {createRoot} from "react-dom/client";

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<Locations />);
  root.unmount();
});
