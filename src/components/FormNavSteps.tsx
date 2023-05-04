import React from "react";
import type { Swiper } from "swiper/react";

import type SwiperCore from "swiper";

type Props = {
  currentStep: number;
  columns: string[];
  swiperInstance: SwiperCore | undefined;
};
const FormNavigation: React.FC<Props> = ({
  currentStep,
  swiperInstance,
  columns,
}) => {
  const handleButtonClick = (index: number) => {
    if (swiperInstance !== undefined) {
      swiperInstance.slideTo(index);
    }
  };
  return (
    <div className="btn-group mx-auto flex max-w-4xl justify-center pl-2 pr-2 sm:pb-2  ">
      {columns.map((columnName, index) => (
        <button
          key={columnName}
          className={`btn  flex-1 capitalize text-white active:bg-primary active:text-white max-xs:p-3 max-six:p-2 ${
            currentStep === index ? "btn-active  " : " "
          }`}
          onClick={() => handleButtonClick(index)}
        >
          <span className="hidden  max-six:inline">{index + 1}</span>
          <span className="hidden six:inline">{columnName}</span>
        </button>
      ))}
    </div>
  );
};

export default FormNavigation;
