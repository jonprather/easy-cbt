import React from "react";
import { FaArrowLeft, FaArrowRight, FaQuestionCircle } from "react-icons/fa";
const PreviousAndNextButtons = ({ setCurrentStep, currentStep, columns }) => {
  return (
    <div className=" m-auto flex flex-row justify-between xs:justify-between sm:max-w-3xl">
      <div>
        <button className={`btn-ghost btn mt-1 ml-4 text-lg xs:ml-0`}>
          <FaQuestionCircle />
        </button>
      </div>
      <div>
        <button
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={currentStep === 0}
          className="btn-neutral btn mt-1 mr-4 text-lg"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={currentStep === columns.length - 1}
          className="btn-neutral btn mt-1 mr-4 text-lg xs:mr-0"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default PreviousAndNextButtons;
