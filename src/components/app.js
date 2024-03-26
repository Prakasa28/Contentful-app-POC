import React, { useState } from "react";
import { Paragraph, TextInput, Note } from "@contentful/f36-components";
import { useSDK } from "@contentful/react-apps-toolkit";

const MyComponent = () => {
  // Create an instance of FieldExtensionSDK
  const sdk = useSDK();

  const [fieldValue, setFieldValue] = useState(sdk.field.getValue());
  const handleValueChange = (e) => {
    const newValue = e.target.value;
    // Update the state with the new value
    setFieldValue(newValue);
    // Set the new value of the field
    sdk.field.setValue(newValue);
  };

  return (
    <div>
      {/* Pass the sdk instance to the TextInput component */}
      <Note>This is a text filed</Note>
      <TextInput value={fieldValue} onChange={handleValueChange} />
    </div>
  );
};

export default MyComponent;
