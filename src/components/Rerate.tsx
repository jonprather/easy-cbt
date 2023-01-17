import React from "react";
const Rerate = ({ currentStep, errors, data, handleChange, columns }) => {
  // TODO finish pulling these out figure out why this is jank and sayign expression expected and shit
  if (currentStep !== columns.length - 1) return;
  return (
    <>
      <label className="mt-4 block">
        Rate Belief in New Thought:
        <input
          type="number"
          name="rateBelief"
          value={data.rateBelief}
          min="1"
          max="100"
          className="focus:shadow-outline w-22 block  rounded-lg border border-gray-300 bg-white py-2 px-4 leading-normal focus:outline-none"
          onBlur={() => console.log()}
          // (errors.rateBelief = "")
          onChange={handleChange}
        />
        {/* TODO im not handling on change not handling state only doing so on submit
 but i might want to implement autoSaves when person rests for a few secods and stuff has changed
 will need state for that i can access the data.rateMood etc and set it that way
*/}
        {errors?.rateBelief && (
          <div className="text-red-500">{errors.rateBelief}</div>
        )}
      </label>

      <label className="mt-4 block">
        Rerate Emotion:
        <input
          onChange={handleChange}
          value={data.rerateEmotion}
          type="number"
          min="1"
          max="100"
          name="rerateEmotion"
          className="focus:shadow-outline min-w-22 block appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 leading-normal focus:outline-none"
        />
        {errors?.rerateEmotion && (
          <div className="text-red-500">{errors.rerateEmotion}</div>
        )}
      </label>

      <button
        type="submit"
        className="mt-6 rounded-lg border border-gray-400 bg-green-600 py-2 px-4 font-semibold text-white shadow-md hover:bg-green-700"
      >
        Add Entry
      </button>
    </>
  );
};
export default Rerate;
