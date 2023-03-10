import React, { useState } from "react";
type Props = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  columns: string[];
};
const FormNavigation: React.FC<Props> = ({
  currentStep,
  setCurrentStep,
  columns,
}) => {
  return (
    // TODO fix on mobile the scrollbar goes over looks a bit jank so maybe have a tiny bit of paddign on the
    <div className="btn-group mx-auto flex max-w-4xl justify-center pl-2 pr-2 sm:pb-2  ">
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
