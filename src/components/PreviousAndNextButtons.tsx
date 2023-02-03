import React from "react";
import { FaArrowLeft, FaArrowRight, FaQuestionCircle } from "react-icons/fa";
type Props = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  columns: string[];
};
const PreviousAndNextButtons: React.FC<Props> = ({
  setCurrentStep,
  currentStep,
  columns,
}) => {
  return (
    <div className=" m-auto flex flex-row justify-between xs:justify-between sm:max-w-3xl">
      <div>
        <button className={`btn-secondary btn mt-1 ml-3 text-lg xs:ml-0`}>
          <FaQuestionCircle />
        </button>
      </div>
      <div>
        <button
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={currentStep === 0}
          className="btn-neutral btn mt-1 mr-3 text-lg"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={currentStep === columns.length - 1}
          className="btn-neutral btn mt-1 mr-3 text-lg xs:mr-0"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default PreviousAndNextButtons;
