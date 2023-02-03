import React from "react";
import type { CBT_FormDataType } from "../types/CBTFormTypes";
import type { ChangeEvent } from "react";
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
        <label className="label flex justify-start ">
          <span className="label-text capitalize text-white">
            Rate Belief in New Thought:
          </span>
          <span
            id={TOOLTIP_RATEBELIEF_ID}
            className="text-md ml-2  bg-inherit p-0"
          >
            <FaInfoCircle />
          </span>
        </label>
        <input
          type="range"
          name="rateBelief"
          value={data.rateBelief}
          min="1"
          max="100"
          className="range range-secondary mt-2 block max-w-xs"
          onBlur={() => console.log()}
          // (errors.rateBelief = "")
          onChange={handleRateMood}
        />
        <div className="flex w-full max-w-xs justify-between px-2 pt-1 text-xs">
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

        <label className="label mt-4 flex justify-start  ">
          <span className="label-text capitalize text-white">
            Rerate mood intensity: {data?.moodLabel}
          </span>
          <span
            id={TOOLTIP_RERATE_MOOD_ID}
            className="text-md ml-2  bg-inherit p-0"
          >
            <FaInfoCircle />
          </span>
        </label>
        <input
          onChange={handleRateMood}
          value={data.rerateEmotion}
          type="range"
          min="1"
          max="100"
          name="rerateEmotion"
          className="range range-primary mt-2 block max-w-xs"
        />
        <div className="flex w-full max-w-xs justify-between px-2 pt-1 text-xs">
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
      <div className="mt-4 mb-2">
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
