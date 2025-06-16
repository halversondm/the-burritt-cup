import React from 'react';
import {render} from '@testing-library/react'
import Award, {Winner} from '../src/Award';

test("Award component", () => {
    const winners: Winner[] = [{year: "", name: ""}]
    const unit = <Award alt="" image="" metatitle="" subtitle="" title="" winners={winners}/>;
    const component = render(unit);
    const tree = component.container;
    expect(tree.toString()).toMatchSnapshot();
});