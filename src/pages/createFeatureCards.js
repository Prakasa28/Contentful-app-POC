import React from "react";

import { GlobalStyles } from "@contentful/f36-components";
import { SDKProvider } from "@contentful/react-apps-toolkit";

import CreateFeatureCard from "../components/createFeatureCardsComponent";

const FeatureCards = () => {
  return (
    <SDKProvider>
      <GlobalStyles />
      <CreateFeatureCard />
    </SDKProvider>
  );
};

export default FeatureCards;
