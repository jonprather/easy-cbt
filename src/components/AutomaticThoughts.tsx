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
  const [input, setInput] = React.useState("");
  const [lastLine, setLastLine] = React.useState("");

  const extractData = (e) => {
    if (e.key === "Enter") {
      const data = input.split("\n");
      if (lastLine && lastLine !== data[data.length - 1]) data.push(lastLine);
      console.log(data);
    }
  };
  const textInput: RefObject<HTMLInputElement> = React.createRef();

  if (currentStep !== 1) return null;
  return (
    <>
      {/* Could use the \n approach then have a button to add the hot thoughts by the new line
    woudl be faster easier less key strokes and just be better UI and UX
    // Yeah lets do it also filter out the empty ones ie dont push them to othe rbox or to data
    */}
      <div className="form-control">
        <label className="label">
          <span className="label-text capitalize text-white">
            List your Automatic Negative Thoughts
          </span>
        </label>
        <textarea
          className="textarea-bordered textarea h-24 bg-white text-black"
          placeholder="thoughts..."
          onKeyDown={(e) => setInput(e.target.value)}
          onBlur={() => {
            const lines = input.split("\n");
            setLastLine(lines[lines.length - 1]);
          }}
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
        ></textarea>
      </div>
      <div className={" sm:h-80"}>
        <div className="flex justify-between ">
          {/* TODO figure these types out */}

          <span className=" text-label my-auto block p-2 text-white">
            Thought List
          </span>
          <button
            type="button"
            className="text-md mt-6 mb-3 rounded-lg border border-gray-400 bg-primary py-2 px-4 font-semibold text-white shadow-md hover:bg-base-300"
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
