import React from "react";
import { FaArrowLeft, FaArrowRight, FaQuestionCircle } from "react-icons/fa";
import Modal from "./molecules/Modal";
import Chat from "./molecules/Chat";
type Props = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setUserQuery: React.Dispatch<React.SetStateAction<string>>;

  columns: string[];
};
const PreviousAndNextButtons: React.FC<Props> = ({
  setCurrentStep,
  setUserQuery,
  currentStep,
  columns,
}) => {
  return (
    <div className=" m-auto flex flex-row justify-start sm:max-w-3xl">
      <div className="">
        <button
          data-testid="prev-btn"
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={currentStep === 0}
          className="btn-neutral btn mt-1 ml-3 text-lg xs:ml-0"
        >
          <FaArrowLeft />
        </button>
        <button
          data-testid="next-btn"
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={currentStep === columns.length - 1}
          className="btn-neutral btn mt-1 ml-3 text-lg xs:ml-0"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default PreviousAndNextButtons;
