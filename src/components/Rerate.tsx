import React from "react";
import type { CBT_FormDataType } from "../types/CBTFormTypes";
import Modal from "./molecules/Modal";
import Collapse from "src/components/Collapse";

import type { ChangeEventHandler } from "react";
import type { InputField } from "./organisms/CBTAppTemplate";

type RerateProps = {
  data: CBT_FormDataType;
  currentStep: number;
  columns: ["Name", "ANTS", "For", "against", "New", "Rerate"];
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    control: InputField["control"]
  ) => void;
  submitButton: () => JSX.Element;
};

const Rerate: React.FC<RerateProps> = ({
  data,
  currentStep,
  handleChange,
  submitButton,
  columns,
}) => {
  const handleRateMood = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e, "RangeSlider");
  };
  if (currentStep !== columns.length - 1) return null;
  return (
    <div className=" min-h-16 relative  flex flex-col justify-between">
      <div className="child-one mb-20 md:mb-48">
        <div className=" flex items-end justify-between">
          <label className="label">
            <Modal
              id={"newThoughtBelieft-modal"}
              labelText={"Rate belief"}
              title={"Rate belief in the New Thought"}
              content={
                "Notice how reasonable the new balanced thought sounds to you. Next give your beleif in this new thought a number between 1-100."
              }
            />
          </label>
        </div>
        <input
          data-testid="rateBeliefInput"
          type="range"
          name="rateBelief"
          value={data.rateBelief}
          min="1"
          max="100"
          className="range range-primary mt-2 block xs:max-w-xs"
          onBlur={() => console.log()}
          onChange={handleRateMood}
        />
        <div className="flex w-full justify-between px-2 pt-1 text-xs xs:max-w-xs">
          <span>Low</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>High</span>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <label className="label">
            <Modal
              id={"rerateMood-modal"}
              labelText={"Rerate Mood Intensity"}
              title={"Rerate Mood Intensity"}
              content={
                "Pay attention to your mood once again. Notice if your mood has now changed from this work and give it a new rating here."
              }
            />
          </label>
        </div>
        <span className="mb-1 ml-2 block">{data.moodLabel}</span>

        <input
          data-testid="rerateMoodInput"
          onChange={handleRateMood}
          value={data.rerateEmotion}
          type="range"
          min="1"
          max="100"
          name="rerateEmotion"
          className="range range-primary mt-2 block xs:max-w-xs"
        />
        <div className="flex w-full justify-between px-2 pt-1 text-xs xs:max-w-xs">
          <span>Low</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>High</span>
        </div>
      </div>
      {/* <div className="mt-11 mb-16  "> */}
      {/* <Collapse
          evidence={data.newThought}
          title="Balanced Thought"
        ></Collapse> */}
      {/* </div> */}

      {submitButton()}
    </div>
  );
};
export default Rerate;
