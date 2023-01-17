import React from "react";
const PreviousAndNextButtons = ({ currentStep, columns }) => {
  const textInput = React.createRef();

  // TODO finish pulling these out figure out why this is jank and sayign expression expected and shit
  return (
    <div className=" m-auto flex flex-row justify-between  sm:max-w-3xl">
      <button
        onClick={() => setCurrentStep(currentStep - 1)}
        disabled={currentStep === 0}
        className={`mt-6 rounded-lg border border-gray-400 bg-white py-2 px-4 font-semibold shadow-sm   ${
          currentStep === 0
            ? "bg-gray-500  text-white"
            : "bg-white text-gray-800 text-white hover:bg-gray-200"
        }`}
      >
        Previous
      </button>
      <button
        onClick={() => setCurrentStep(currentStep + 1)}
        disabled={currentStep === columns.length - 1}
        className={`mt-6 rounded-lg border border-gray-400 py-2  px-4 font-semibold text-white shadow-sm  ${
          currentStep === columns.length - 1
            ? "bg-gray-500 "
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default PreviousAndNextButtons;
