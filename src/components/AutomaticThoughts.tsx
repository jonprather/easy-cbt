import React from "react";
import type { RefObject } from "react";
import type { CBT_FormDataType } from "../types/CBTFormTypes";
import { FaPlusCircle, FaTrash, FaFire, FaCircle } from "react-icons/fa";
import { MdLocalFireDepartment, MdSentimentNeutral } from "react-icons/md";
import type { ChangeEventHandler } from "react";
import Modal from "./molecules/Modal";
import DialogDemo from "./RadixDialog";

export const ANTDataAtributes = {
  addAntLabel: "addAntLabel",
  addAntInput: "addAntInput",
  addAntBtn: "addAntBtn",

  toggleHotAntBtn: "toggleHotAntBtn",

  deleteAntBtn: "deleteAntBtn",
};
type AutomaticThoughtsProps = {
  data: CBT_FormDataType;
  currentStep: number;
  errors: any;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  setData: React.Dispatch<React.SetStateAction<CBT_FormDataType>>;
};

const AutomaticThoughts: React.FC<AutomaticThoughtsProps> = ({
  data,
  currentStep,
  errors,
  setData,
  handleChange,
}) => {
  const handleDelete = (index: number) => {
    setData((data) => {
      const newAutomaticThoughts = data.automaticThoughts.filter(
        (thought, i) => i !== index
      );
      console.log("NEW ANTS AFTER", newAutomaticThoughts);

      return { ...data, automaticThoughts: newAutomaticThoughts };
    });
  };
  console.log("DATA GLOBAL", data);
  const handleHotThoughtClick = (index: number) => {
    console.log(
      "ANT LENGTH",
      data.automaticThoughts.filter((ele) => ele?.isHot).length > 0
    );
    if (
      data.automaticThoughts.filter((ele) => ele?.isHot).length > 0 &&
      !data?.automaticThoughts[index]?.isHot
    ) {
      // return alert("Already an ANT please choose one!");
      // not sure if i want thsi for the userExperience...
    }
    // ok only want this to block if it is a different ant then the current hot though

    setData((prev) => {
      const newThoughts = [...prev.automaticThoughts];
      newThoughts[index] = {
        ...newThoughts[index],
        isHot: !newThoughts[index]?.isHot ?? false,
        thought: newThoughts[index]?.thought ?? "",
      };
      return {
        ...prev,
        automaticThoughts: newThoughts,
      };
    });
  };
  const handleClick = () => {
    const newThought = textInput?.current?.value || "";
    if (!newThought) return;

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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    console.log("IN HANDLEKEY", event, event.key);
    if (event.code === "Enter") {
      console.log("IN HANDLEKEY--inner");

      handleClick();
    }
  };
  // TODO on update route this gets overwritten as it pulls from db and this isnt saved...
  // so need to slow down the update pulling, and also consider auto saves...
  const textInput: RefObject<HTMLInputElement> = React.createRef();

  if (currentStep !== 1) return null;
  return (
    <>
      <div className="form-control mt-6 mb-10">
        <label className="label flex  justify-start">
          <DialogDemo
            title="Automatic Negative Thoughts"
            labelText="Automatic Thoughts"
            description={
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
        <div className="form-control">
          <div className="input-group ">
            <input
              data-testid={ANTDataAtributes.addAntInput}
              type="text"
              placeholder="Im having the thought that..."
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              ref={textInput}
              name="AddANT"
              className="sm:max-w-x-lg input-bordered input w-full bg-white text-black"
            />
            <button
              data-testid={ANTDataAtributes.addAntBtn}
              type="button"
              onClick={handleClick}
              className="btn-accent btn-square btn  text-lg"
            >
              <FaPlusCircle />
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
        {/* Might be cool to add ability to remove a ANT ie undo */}
        {/* TODO fix undo its not deleting first elemnt and delteing wrong element at times... */}
        <div className=" over h-48 w-full overflow-y-auto overscroll-contain rounded-lg bg-slate-300 p-2 ">
          <ul>
            {/* Well apparently yeah its needed could  */}
            {/* This sort of advice could be conditional on being a new user */}
            {!data?.automaticThoughts[0] && (
              <li className="relative mb-2 rounded bg-gray-100 p-2">
                <span className="p-2 italic text-gray-800">
                  Add a thought above and then choose the hot thought here by
                  clicking on it- it will turn blue once you do!
                </span>
              </li>
            )}

            {data?.automaticThoughts.map((thoughts, index) => (
              <li
                key={index}
                className={`relative mb-2 block min-h-[100%] w-[100%] overflow-clip overflow-ellipsis rounded-xl bg-white p-2 pr-0 ${
                  thoughts?.isHot ? " border-red-500 bg-secondary " : ""
                }`}
              >
                <button
                  data-testid={ANTDataAtributes.toggleHotAntBtn}
                  className={`text-md mr-4 flex w-[90%]  cursor-pointer items-center p-2 p-1 text-left ${
                    thoughts?.isHot ? "text-gray-900" : "text-gray-900"
                  }`}
                  onClick={() => handleHotThoughtClick(index)}
                >
                  <span className="absolute top-3 left-4   ">
                    {/* TODO HMMM this extra space looks jank on modal how can i make this even? */}
                    {/* IDK nto totally into the icons placement its close maybe good enough for abs pos */}
                    {thoughts?.isHot ? (
                      <FaFire className="min-h-[24px] text-sm text-accent" />
                    ) : (
                      <FaFire className="min-h-[24px] text-sm text-gray-300" />
                    )}
                  </span>
                  <span className="text-md ml-8 mr-4 overflow-clip xs:mr-2">
                    {thoughts?.thought}
                  </span>
                </button>

                <button
                  data-testid={ANTDataAtributes.deleteAntBtn}
                  className={`text-md absolute bottom-0 right-0 p-4  ${
                    thoughts?.isHot ? "text-slate-600" : "text-slate-400"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(index);
                  }}
                >
                  <span className="mx-auto">
                    <FaTrash />
                  </span>
                </button>
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
