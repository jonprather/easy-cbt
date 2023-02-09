import React from "react";
import type { RefObject } from "react";
import type { CBT_FormDataType } from "../types/CBTFormTypes";
import { FaPlusCircle } from "react-icons/fa";
import type { ChangeEventHandler } from "react";
import Modal from "./molecules/Modal";
type AutomaticThoughtsProps = {
  data: CBT_FormDataType;
  currentStep: number;
  errors: any;
  handleHotThoughtClick: (index: number) => void;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  setData: React.Dispatch<React.SetStateAction<CBT_FormDataType>>;
};

const AutomaticThoughts: React.FC<AutomaticThoughtsProps> = ({
  data,
  currentStep,
  errors,
  handleHotThoughtClick,
  setData,
  handleChange,
}) => {
  const handleClick = () => {
    const newThought = textInput?.current?.value || "";
    if (!newThought) return;
    // TODO i have no idea why the same type wouldnt match here
    // data is the prev CBT_FormDataType and so is this param idk
    setData((data) => {
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
        <label className="label flex  justify-start">
          <Modal
            id="ANT"
            title="Automatic Negative Thoughts"
            labelText="Automatic Thoughts"
            content={
              <>
                <p>
                  List one at a time your Automatic Negative Thoughts. Automatic
                  Negative thoughts are thoughts which pop into your head and
                  have a negative tone.
                </p>

                <p className="pt-2">
                  An example for Anxiety might be: This is too intense I cannot
                  handle it.
                </p>
              </>
            }
          />
        </label>

        <label className="">
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
        <div className="flex justify-end ">
          <div className=" text-white">
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
        <div className="flex items-end justify-between">
          <label className="label">
            <Modal
              id={"hot-thought"}
              labelText={"Choose the hot thought"}
              title="Choose the Hot Thought"
              content={
                "Please choose the thought that is most closely related to your choosen strong mood. It is useful to consider each thought and listen to your body and see the reaction."
              }
            />
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
        </div>

        {/* {errors?.automaticThoughts && (
          <div className="text-red-500">{errors.automaticThoughts}</div>
        )} */}
      </div>
    </>
  );
};

export default AutomaticThoughts;
