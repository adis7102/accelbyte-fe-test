import React from "react";
import Button from '../index';

import { mount } from "enzyme";

it('should render Button correctly', () => {
    const wrapper = mount(<Button />);

    expect(wrapper).toMatchSnapshot();
});