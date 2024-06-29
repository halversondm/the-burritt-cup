import Main from '../src/Main';
import {render} from "@testing-library/react";

test("renders without crashing", () => {
  const unit = <Main />;
  const component = render(unit);
  const tree = component.container;
  expect(tree.toString()).toMatchSnapshot();
});
