import React from "react";

import { GlobalStyles } from "@contentful/f36-components";
import { SDKProvider } from "@contentful/react-apps-toolkit";

import ColorPickerApp from "@/components/colorpickerapp";

const ColorPicker = () => {
  return (
    <SDKProvider>
      <GlobalStyles />
      <ColorPickerApp />
    </SDKProvider>
  );
};

export default ColorPicker;
