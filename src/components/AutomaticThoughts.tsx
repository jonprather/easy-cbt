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
  handleChange,
}) => {
  const [input, setInput] = React.useState("");
  const [lastLine, setLastLine] = React.useState("");

  const extractData = (e) => {
    let antArr = e.target.value
      .split("\n")
      .filter((ele) => ele)
      .map((thought) => {
        return {
          thought,
          isHot: false,
        };
      });

    setData((prev) => {
      return {
        ...prev,
        automaticThoughts: antArr,
      };
    });
  };
  const textInput: RefObject<HTMLInputElement> = React.createRef();

  if (currentStep !== 1) return null;
  return (
    <>
      {/* Could use the \n approach then have a button to add the hot thoughts by the new line
    woudl be faster easier less key strokes and just be better UI and UX
    // Yeah lets do it also filter out the empty ones ie dont push them to othe rbox or to data
    */}

      {/*  */}
      <div className={" sm:h-80"}>
        <div className="mb-2 mt-4 ">
          <label className="label block w-full">
            <span className="label-text mb-2 block capitalize text-white">
              {/* These are slighly off ie name input and select mood slighlty deff padding on container */}{" "}
              List Thoughts
            </span>
            <input
              // value={data.name}
              // TODO
              onChange={handleChange}
              ref={textInput}
              placeholder="Thoughts..."
              type="text"
              name="name"
              className="sm:max-w-x-lg input-bordered input w-full w-full bg-white text-black"
              // className="focus:shadow-outline block w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 pl-6 pr-6 leading-normal text-black focus:outline-none md:w-1/2"
            />
            {/* TODO could add a way to remove automatic thoughts but note if its old data have to also remove from db */}
            {errors?.name && <div className="text-red-500">{errors.name}</div>}
          </label>
        </div>
        {/* <label className="label mt-4  block">
          <span className="label-text block text-white">
            🐜 Automatic Negative Thoughts:
          </span>
          <input
            type="text"
            name="automaticThoughts"
            className="input-bordered input block bg-white text-black"
            // className="focus:shadow-outline block w-full   appearance-none rounded-lg border border-gray-300  py-2 px-4 font-normal leading-normal focus:outline-none"
          />
        </label> */}
        <div className="flex justify-between ">
          {/* TODO figure these types out */}

          <button
            type="button"
            onClick={(e) => {
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
            }}
            className="btn-accent btn mb-10"
          >
            Add Thoughts
          </button>
        </div>
      </div>
      {/*  */}
      <div className={" sm:h-80"}>
        <span className=" label-text mb-2 block text-white">Thought List</span>
        <div className="h-36 overflow-y-scroll rounded-lg bg-gray-100 p-2 md:h-52">
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
        </div>

        {errors?.automaticThoughts && (
          <div className="text-red-500">{errors.automaticThoughts}</div>
        )}
      </div>
    </>
  );
};

export default AutomaticThoughts;
