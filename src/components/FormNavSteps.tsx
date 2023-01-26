import React, { useState } from "react";

const FormNavigation = ({ currentStep, setCurrentStep, errors, columns }) => {
  // TODO so errors could be used but they are not cleanly mapped ie the names are diff and the indexs
  // wont nedd match bc obj
  return (
    <div className="btn-group mx-auto flex max-w-4xl justify-center  sm:p-2">
      {columns.map((columnName, index) => (
        <button
          key={columnName}
          className={`btn  flex-1 capitalize text-white active:bg-primary active:text-white max-xs:p-3 max-six:p-2 ${
            currentStep === index ? "btn-active  " : " "
          }`}
          onClick={() => setCurrentStep(index)}
          // disabled={index === currentStep}
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

// TODO continue using daisyui to improve forms i worked on outsides but not all of them
// also settle bg colors on lg would be nice if worked on light mode as well
