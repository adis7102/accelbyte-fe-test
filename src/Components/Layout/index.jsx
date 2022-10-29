import React from "react";

import "./style.scss";

const Layout = (props) => {
  const { children } = props;

  return <div className="layout">{children}</div>;
};

export default Layout;
