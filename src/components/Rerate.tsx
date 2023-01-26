import React from "react";
import type { CBT_FormDataType } from "../types/CBTFormTypes";
import type { ChangeEvent } from "react";

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
  // TODO finish pulling these out figure out why this is jank and sayign expression expected and shit
  if (currentStep !== columns.length - 1) return null;
  return (
    <>
      <div className="text-clip-max-md mt-4 overflow-hidden text-ellipsis whitespace-nowrap ">
        <h1 className="text-md  text-md font-medium sm:text-lg">
          ⚖️ Balanced Thought:
        </h1>

        <div className="h-36 overflow-x-hidden overflow-y-scroll text-clip bg-white p-2 md:h-52 ">
          <ul>
            <li>{data.newThought}</li>
          </ul>
        </div>
      </div>
      <label className="text-md mt-4 block font-medium sm:text-lg ">
        📏 Rate Belief in New Thought:
        <input
          type="range"
          name="rateBelief"
          value={data.rateBelief}
          min="1"
          max="100"
          className="focus:shadow-outline block w-1/3 rounded-lg border border-gray-300 bg-white py-2   leading-normal "
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
      <label className="text-md mt-4 block font-medium sm:text-lg ">
        📏 Rerate Emotion: {data?.nameMood?.label}
        <input
          onChange={handleRateMood}
          value={data.rerateEmotion}
          type="range"
          min="1"
          max="100"
          name="rerateEmotion"
          className="focus:shadow-outline block w-1/3 rounded-lg border border-gray-300 bg-white py-2  leading-normal "
        />
        {errors?.rerateEmotion && (
          <div className="text-red-500">{errors.rerateEmotion}</div>
        )}
      </label>

      <button
        type="submit"
        disabled={currentStep !== columns.length - 1}
        className="mt-6 rounded-lg border border-gray-400 bg-green-600 py-2 px-4 font-semibold text-white shadow-md hover:bg-green-700"
      >
        {data.id ? "Update Entry" : "Add Entry"}
      </button>
    </>
  );
};
export default Rerate;
