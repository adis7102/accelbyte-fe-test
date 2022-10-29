import React from "react";
import Layout from '../index';

import { mount } from "enzyme";

it('should render Layout correctly', () => {
    const wrapper = mount(<Layout />);

    expect(wrapper).toMatchSnapshot();
});