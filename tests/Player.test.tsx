import Player from '../src/Player';
import {render} from "@testing-library/react";

test("renders without crashing", () => {
  const unit = <Player />;
  const component = render(unit);
  const tree = component.container;
  expect(tree.toString()).toMatchSnapshot();
});