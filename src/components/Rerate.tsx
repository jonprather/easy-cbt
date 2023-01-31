import React from "react";
import type { CBT_FormDataType } from "../types/CBTFormTypes";
import type { ChangeEvent } from "react";
import Collapse from "src/components/Collapse";
// TODO make the ranges more explicit give helper alt attributes

type RerateProps = {
  data: CBT_FormDataType;
  currentStep: number;
  errors: any;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  columns: ["Name", "ANTS", "For", "against", "New", "Rerate"];
};
const Rerate: React.FC<RerateProps> = ({
  data,
  currentStep,
  errors,
  setData,
  columns,
}) => {
  // TODO can reuse this for all the ratings as they require string to number conversion
  const handleRateMood = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: +e.target.value,
      };
    });
  };
  if (currentStep !== columns.length - 1) return null;
  return (
    <div className="min-h- min-h-16 mt-4 flex flex-col justify-between">
      {/* TODO COULD give these all a class like form child one so that they all have same top margin 
      also same for parent , also for child two to give it consistent bottom margin
      */}
      <div className="child-one">
        <label className="label block  ">
          <span className="label-text capitalize text-white">
            Rate Belief in New Thought:
          </span>
          <input
            type="range"
            name="rateBelief"
            value={data.rateBelief}
            min="1"
            max="100"
            className="range range-secondary mt-2 block sm:w-1/2  md:w-1/3"
            onBlur={() => console.log()}
            // (errors.rateBelief = "")
            onChange={handleRateMood}
          />
          {/* TODO im not handling on change not handling state only doing so on submit
but i might want to implement autoSaves when person rests for a few secods and stuff has changed
will need state for that i can access the data.rateMood etc and set it that way
*/}
          {errors?.rateBelief && (
            <div className="text-red-500">{errors.rateBelief}</div>
          )}
        </label>
        <label className="label mt-4 block  ">
          <span className="label-text capitalize text-white">
            Rerate mood intensity: {data?.moodLabel}
          </span>
          <input
            onChange={handleRateMood}
            value={data.rerateEmotion}
            type="range"
            min="1"
            max="100"
            name="rerateEmotion"
            className="range range-primary mt-2 block sm:w-1/2  md:w-1/3"
          />
          {errors?.rerateEmotion && (
            <div className="text-red-500">{errors.rerateEmotion}</div>
          )}
        </label>
      </div>
      <div className="mt-4 mb-2">
        <Collapse
          evidence={data.newThought}
          title="Balanced Thought"
        ></Collapse>
      </div>
    </div>
  );
};
export default Rerate;
