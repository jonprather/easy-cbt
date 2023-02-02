import React, { useState } from "react";

const FormNavigation = ({ currentStep, setCurrentStep, errors, columns }) => {
  return (
    <div className="btn-group mx-auto flex max-w-4xl justify-center sm:pb-2  ">
      {columns.map((columnName, index) => (
        <button
          key={columnName}
          className={`btn  flex-1 capitalize text-white active:bg-primary active:text-white max-xs:p-3 max-six:p-2 ${
            currentStep === index ? "btn-active  " : " "
          }`}
          onClick={() => setCurrentStep(index)}
          // disabled={index === currentStep}
        >
          {columnName}
        </button>
      ))}
    </div>
  );
};

export default FormNavigation;
