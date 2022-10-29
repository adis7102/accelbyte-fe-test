import React from "react";
import Input from '../index';

import { mount } from "enzyme";

it('should render Input correctly', () => {
    const wrapper = mount(<Input />);

    expect(wrapper).toMatchSnapshot();
});