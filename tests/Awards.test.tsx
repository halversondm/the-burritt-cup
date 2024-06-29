import Awards from '../src/Awards';
import {render} from "@testing-library/react";

test("renders without crashing", () => {
  const unit = <Awards />;
  const component = render(unit);
  const tree = component.container;
  expect(tree.toString()).toMatchSnapshot();
});
