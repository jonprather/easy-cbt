import React, { useState } from "react";

const FormNavigation = ({ currentStep, setCurrentStep, errors, columns }) => {
  // TODO so errors could be used but they are not cleanly mapped ie the names are diff and the indexs
  // wont nedd match bc obj
  return (
    <div className=" mx-auto flex  justify-center sm:gap-1 md:max-w-5xl  md:pl-12 md:pr-0">
      {columns.map((columnName, index) => (
        <button
          key={columnName}
          className={`sm:text-md md:text-md min-w-0 flex-1 rounded-t-md px-2 py-2 text-sm font-normal capitalize text-white ${
            currentStep === index ? "bg-sky-900  " : "bg-gray-700 shadow-sm"
          }`}
          onClick={() => setCurrentStep(index)}
          disabled={index === currentStep}
        >
          {/* if current step have full name else have ... atleast on mobile */}
          {columnName}
          {/* {index === currentStep ? index + 1 + " " + columnName : index + 1} */}
          {/* columnName.split(" ").slice(0, 1).join(" ") + "..." works for desktop but for smaller i want just steps */}
        </button>
      ))}
    </div>
  );
};

export default FormNavigation;

// TODO if use stepper this way could also pass down errors to show for each label like mark them red
// and give msg
