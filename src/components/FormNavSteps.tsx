import React, { useState } from "react";

const FormNavigation = ({ currentStep, setCurrentStep, errors }) => {
  const columns = [
    "Name Mood",
    "Rate Mood",
    "Automatic Thoughts",
    "Evidence for the Thought",
    "Evidence Against the Thought",
    "New Balanced Thought",
    "Rate Belief in New Thought",
    "Rerate Emotion",
  ];
  // TODO so errors could be used but they are not cleanly mapped ie the names are diff and the indexs
  // wont nedd match bc obj
  return (
    <div className="container flex justify-between">
      <button
        onClick={() => setCurrentStep(currentStep - 1)}
        disabled={currentStep === 0}
      >
        Previous
      </button>
      {columns.map((columnName, index) => (
        <button
          key={columnName}
          className={` rounded-t-md px-2 py-1 ${
            currentStep === index ? "bg-blue-500 text-white" : "bg-gray-200"
          }
         
          `}
          onClick={() => setCurrentStep(index)}
        >
          {/* // handleStepChange this would have diff logic right bc would jump to it so would need to pass it the index */}

          {columnName}
        </button>
      ))}
      <button
        onClick={() => setCurrentStep(currentStep + 1)}
        disabled={currentStep === columns.length - 1}
      >
        Next
      </button>
    </div>
  );
};

export default FormNavigation;

// TODO if use stepper this way could also pass down errors to show for each label like mark them red
// and give msg

// TODO doesnt match other container on small screens
