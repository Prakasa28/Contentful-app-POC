// components/FeatureCards.js
import React from "react";
import Styles from "../style/featureCard.module.css";

const FeatureCards = ({ features }) => {
  return (
    <div className={Styles.featureCardsContainer}>
      {features.map((feature, index) => (
        <div
          key={index}
          className={Styles.featureCard}
          style={{ backgroundColor: getColor(index) }}
        >
          <h2>{feature.trim()}</h2>
        </div>
      ))}
    </div>
  );
};

// Function to get color based on index
const getColor = (index) => {
  const colors = ["#ffc107", "#007bff", "#28a745"]; // Example colors
  return colors[index % colors.length];
};

export default FeatureCards;
