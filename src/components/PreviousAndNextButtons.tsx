import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import type SwiperCore from "swiper";

type Props = {
  currentStep: number;
  swiperInstance: SwiperCore | undefined;
  columns: string[];
};
const PreviousAndNextButtons: React.FC<Props> = ({
  currentStep,
  columns,
  swiperInstance,
}) => {
  const handleButtonClick = (index: number) => {
    if (swiperInstance !== undefined) {
      swiperInstance.slideTo(index);
    }
  };
  return (
    <div className=" m-auto flex flex-row justify-start sm:max-w-3xl">
      <div className="">
        <button
          data-testid="prev-btn"
          onClick={() => handleButtonClick(currentStep - 1)}
          disabled={currentStep === 0}
          className="btn-neutral btn mt-1 ml-3 text-lg xs:ml-0"
          aria-label="previous step"
        >
          <FaArrowLeft />
        </button>
        <button
          data-testid="next-btn"
          onClick={() => handleButtonClick(currentStep + 1)}
          disabled={currentStep === columns.length - 1}
          className="btn-neutral btn mt-1 ml-3 text-lg xs:ml-0"
          aria-label="next step"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default PreviousAndNextButtons;
