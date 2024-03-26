import React, { useState, useEffect } from "react";
import { Select, TextInput, Note } from "@contentful/f36-components";
import { useSDK } from "@contentful/react-apps-toolkit";

const CreateFeatureCard = () => {
  const sdk = useSDK();

  const initialValue = sdk.field.getValue() || [];
  const [inputValue, setInputValue] = useState(initialValue);
  const [selectedNumber, setSelectedNumber] = useState(initialValue.length);

  useEffect(() => {
    sdk.field.setValue(inputValue);
  }, [inputValue, sdk.field]);

  // Function to handle the change in selected number
  const newValueArray = [];
  const handleNumberChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setSelectedNumber(newValue);
    setInputValue(inputValue.slice(0, newValue));
    sdk.field.setValue([inputValue.length - 1]);

    newValueArray.push(newValue);
    console.log(newValueArray);
  };

  // Function to handle change in input values
  const handleInputChange = (e, index) => {
    const newValue = [...inputValue];

    newValue[index] = e.target.value;
    // Update the state with the new value
    setInputValue(newValue);
    // Set the new value of the field
    sdk.field.setValue(newValue);
    console.log(newValue);
  };

  // Render text inputs based on selected number
  const renderTextInputs = () => {
    const inputs = [];
    for (let i = 0; i < selectedNumber; i++) {
      inputs.push(
        <div key={i}>
          <Note>This is text field {i + 1}</Note>
          <TextInput
            value={inputValue[i] || ""}
            onChange={(e) => handleInputChange(e, i)}
          />
        </div>
      );
    }
    return inputs;
  };

  return (
    <div>
      <Note>This is a number select field</Note>

      <Select value={selectedNumber} onChange={handleNumberChange}>
        <Select.Option value={[0]} isDisabled>
          Please select a number
        </Select.Option>
        <Select.Option value={[1]}>1</Select.Option>
        <Select.Option value={[2]}>2</Select.Option>
        <Select.Option value={[3]}>3</Select.Option>
        <Select.Option value={[4]}>4</Select.Option>
      </Select>
      {selectedNumber && renderTextInputs()}
    </div>
  );
};

export default CreateFeatureCard;
