// InstructionsSection.jsx
import React from "react";

const InstructionsSection = ({ temperature, isPrintable }) => {
  const convertCelsiusToFahrenheit = (celsius) => {
    return ((celsius * 9) / 5 + 32).toFixed(2);
  };

  return (
    <div className={` mt-1 ${isPrintable ? "printable-content" : ""}`}>
      <h2 className="text-lg font-bold">Instructions</h2>
      <p className="text-base">
        Store at {temperature}°C or {convertCelsiusToFahrenheit(temperature)}°F
        temperature.
      </p>
      <p className="text-base">
        Shake well before using and opening the bottle.
      </p>
      <p>Open carefully - bottle may have positive pressure inside.</p>

      <p className="text-base">
        Keep out of reach of children and not for human/animal use.
      </p>
    </div>
  );
};

export default InstructionsSection;
