import React from "react";
import type { CBT_FormDataType } from "../types/CBTFormTypes";
import Modal from "./molecules/Modal";
import Collapse from "src/components/Collapse";
import { Tooltip } from "react-tooltip";

import { FaInfoCircle } from "react-icons/fa";
type RerateProps = {
  data: CBT_FormDataType;
  currentStep: number;
  setData: React.Dispatch<React.SetStateAction<CBT_FormDataType>>;
  errors: any;
  columns: ["Name", "ANTS", "For", "against", "New", "Rerate"];
};
const TOOLTIP_RATEBELIEF_ID = "toolTipRateBelief";
const TOOLTIP_RERATE_MOOD_ID = "toolTipRerateMood";

const Rerate: React.FC<RerateProps> = ({
  data,
  currentStep,
  errors,
  setData,
  columns,
}) => {
  const handleRateMood = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev: CBT_FormDataType): CBT_FormDataType => {
      return {
        ...prev,
        [e.target.name]: +e.target.value,
      };
    });
  };
  if (currentStep !== columns.length - 1) return null;
  return (
    <div className=" min-h-16 mt-4 flex flex-col justify-between">
      <div className="child-one">
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
          type="range"
          name="rateBelief"
          value={data.rateBelief}
          min="1"
          max="100"
          className="range range-primary mt-2 block xs:max-w-xs"
          onBlur={() => console.log()}
          // (errors.rateBelief = "")
          onChange={handleRateMood}
        />
        <div className="flex w-full justify-between px-2 pt-1 text-xs xs:max-w-xs">
          <span>Low</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>High</span>
        </div>
        {/* TODO implement autoSaves when person rests for a few secods and stuff has changed
will need state for that i can access the data.rateMood etc and set it that way
*/}
        {/* {errors?.rateBelief && (
          <div className="text-red-500">{errors.rateBelief}</div>
        )} */}

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
        <input
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
        {/* {errors?.rerateEmotion && (
          <div className="text-red-500">{errors.rerateEmotion}</div>
        )} */}
      </div>
      <div className="mt-11 ">
        <Collapse
          evidence={data.newThought}
          title="Balanced Thought"
        ></Collapse>
      </div>

      {[
        {
          id: TOOLTIP_RATEBELIEF_ID,
          content: "Notice how reasonable it sounds to you.",
        },
        {
          id: TOOLTIP_RERATE_MOOD_ID,
          content: "Notice how your mood has changed.",
        },
      ].map((toolTip) => {
        return (
          <Tooltip
            key={toolTip.id}
            anchorId={toolTip.id}
            content={toolTip.content}
            events={["click", "hover"]}
            className="bg-primary"
            variant="light"
          />
        );
      })}
    </div>
  );
};
export default Rerate;
