import Post from '../src/Post';
import {render} from "@testing-library/react";

test("renders without crashing", () => {
  const unit = <Post />;
  const component = render(unit);
  const tree = component.container;
  expect(tree.toString()).toMatchSnapshot();
});
