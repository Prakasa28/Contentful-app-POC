import React, { useEffect, useState } from "react";
import { useSDK } from "@contentful/react-apps-toolkit";
import { SketchPicker } from "react-color";

const ColorPickerApp = () => {
  const sdk = useSDK();
  const [color, setColor] = useState();

  useEffect(() => {
    sdk.window.startAutoResizer();
    setColor(sdk.field.getValue());
  }, [sdk.window, sdk.field]);

  const handleChange = (color) => {
    setColor(color.rgb);
    sdk.field.setValue(color);
  };

  return <SketchPicker color={color} onChange={handleChange} />;
};

export default ColorPickerApp;
