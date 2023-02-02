import React from "react";
import { Tooltip } from "react-tooltip";
import type { RefObject } from "react";
import type { CBT_FormDataType } from "../types/CBTFormTypes";
import { FaPlusCircle } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";

import "react-tooltip/dist/react-tooltip.css";

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
  handleChange,
}) => {
  const handleClick = (e) => {
    const newThought = textInput?.current?.value || "";
    if (!newThought) return;
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
  };

  const textInput: RefObject<HTMLInputElement> = React.createRef();

  if (currentStep !== 1) return null;
  return (
    <>
      <div className="form-control mt-4">
        <label className=" label flex items-end justify-start">
          <span className="label-text  capitalize text-white">
            Automatic Negative Thoughts
          </span>
          <span id="ANT" className="text-md ml-2  bg-inherit p-0">
            <FaInfoCircle />
          </span>
        </label>

        <label className="input-group">
          <input
            type="text"
            placeholder="Im having the thought that..."
            onChange={handleChange}
            ref={textInput}
            name="AddANT"
            className="sm:max-w-x-lg input-bordered input mb-4 w-full bg-white text-black"
          />
        </label>
      </div>
      <div className={" sm:h-2/3"}>
        <div className="flex justify-between ">
          <div
            className=" text-white"
            data-tip="This will add thoughts to the below box from which you will be able to select the hot thought."
          >
            <button
              type="button"
              onClick={handleClick}
              className="btn-accent btn mb-10"
            >
              <span className="mr-4 text-lg">
                <FaPlusCircle />
              </span>
              Add Thought
            </button>
          </div>
        </div>
      </div>
      {/*  */}
      <div className={" "}>
        <div className="flex items-end justify-start">
          <label htmlFor="" className="label">
            <span className="label-text  block bg-none capitalize text-white">
              choose the hot thought
            </span>
            <span id="hotThought" className="text-md ml-2  bg-inherit p-0">
              <FaInfoCircle />
            </span>
          </label>
        </div>

        <div className=" h-36 overflow-y-scroll rounded-lg bg-gray-100 p-2 ">
          <ul>
            {data?.automaticThoughts?.map((thoughts, index) => (
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
          <Tooltip
            anchorId="ANT"
            content="List thoughts which relate to your mood."
            events={["click", "hover"]}
            className="bg-primary"
            variant="light"
          />
          <Tooltip
            anchorId="hotThought"
            content="Please select a hot thought to work on."
            events={["click", "hover"]}
            className="bg-primary"
            variant="light"
          />
        </div>

        {errors?.automaticThoughts && (
          <div className="text-red-500">{errors.automaticThoughts}</div>
        )}
      </div>
    </>
  );
};

export default AutomaticThoughts;
