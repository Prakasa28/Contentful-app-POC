import React from "react";

import { GlobalStyles } from "@contentful/f36-components";
import { SDKProvider } from "@contentful/react-apps-toolkit";

import App from "../components/app";

const field = () => {
  return (
    <SDKProvider>
      <GlobalStyles />
      <App />
    </SDKProvider>
  );
};

export default field;
