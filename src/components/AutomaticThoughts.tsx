import React from "react";

import type { RefObject } from "react";
import type { CBT_FormDataType } from "../types/CBTFormTypes";

type AutomaticThoughtsProps = {
  data: CBT_FormDataType;
  currentStep: number;
  errors: any;
  handleHotThoughtClick: (index: number) => void;
  setData: (data: CBT_FormDataType) => CBT_FormDataType;
};

const AutomaticThoughts: React.FC<AutomaticThoughtsProps> = ({
  data,
  currentStep,
  errors,
  handleHotThoughtClick,
  setData,
}) => {
  const textInput: RefObject<HTMLInputElement> = React.createRef();

  if (currentStep !== 1) return null;
  return (
    <>
      {/* Could use the \n approach then have a button to add the hot thoughts by the new line
    woudl be faster easier less key strokes and just be better UI and UX
    */}
      <div className={" sm:h-80"}>
        <label className="text-md mt-4 block font-medium sm:text-lg ">
          🐜 Automatic Negative Thoughts:
          <input
            type="text"
            name="automaticThoughts"
            ref={textInput}
            className="focus:shadow-outline block w-full   appearance-none rounded-lg border border-gray-300  py-2 px-4 font-normal leading-normal focus:outline-none"
          />
        </label>
        <div className="flex justify-between ">
          {/* TODO figure these types out */}

          <h3 className="text-md  my-auto block p-2 font-medium sm:text-lg">
            📜 Thought List
          </h3>
          <button
            type="button"
            onClick={(e) => {
              const newThought = textInput?.current?.value || "";
              // TODO i have no idea why the same type wouldnt match here
              // data is the prev CBT_FormDataType and so is this param idk
              setData((data: CBT_FormDataType): CBT_FormDataType => {
                return {
                  ...data,
                  automaticThoughts: [
                    ...data.automaticThoughts,
                    { thought: newThought, isHot: false },
                  ],
                };
              });
              if (textInput && textInput.current) {
                textInput.current.value = "";
              }
            }}
            className="text-md mt-6 mb-3 rounded-lg border border-gray-400 bg-blue-600 py-2 px-4 font-semibold text-white shadow-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        <div className="h-36 overflow-y-scroll bg-gray-100 p-2 md:h-52 ">
          <ul>
            {data.automaticThoughts.map((thoughts, index) => (
              <li
                key={index}
                onClick={() => handleHotThoughtClick(index)}
                className={` cursor-pointer text-lg ${
                  thoughts?.isHot === true ? "text-red-500" : "text-gray-700"
                }`}
              >
                {/* <input
                  name="automaticThoughts"
                  value={thoughts.thought}
                  onChange={(e) => handleChange(e, index)}
                /> */}
                {`${thoughts?.isHot ? "🔥 " : "😐 "}`} {thoughts?.thought}
              </li>
            ))}
          </ul>
        </div>

        {errors?.automaticThoughts && (
          <div className="text-red-500">{errors.automaticThoughts}</div>
        )}
      </div>
    </>
  );
};

export default AutomaticThoughts;
