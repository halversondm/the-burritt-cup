import Locations from '../src/Locations';
import {render} from "@testing-library/react";

test("renders without crashing", () => {
  const unit = <Locations />;
  const component = render(unit);
  const tree = component.container;
  expect(tree.toString()).toMatchSnapshot();
});
