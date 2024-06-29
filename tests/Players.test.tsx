import Players from '../src/Players';
import {render} from "@testing-library/react";

test("renders without crashing", () => {
  const unit = <Players />;
  const component = render(unit);
  const tree = component.container;
  expect(tree.toString()).toMatchSnapshot();
});
