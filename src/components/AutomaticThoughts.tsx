import React, { useState } from "react";
import type { CBT_FormDataType } from "../types/CBTFormTypes";
import { FaPlusCircle, FaTrash, FaFire } from "react-icons/fa";
import Modal from "./molecules/Modal";
import DialogDemo from "./RadixDialog";
import CharCountDisplay from "./atoms/CharacterCountDisplay";
import type { TSaveStatus } from "./organisms/CBTAppTemplate";

const MAX_LENGTH = 500;

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
  setData: React.Dispatch<React.SetStateAction<CBT_FormDataType>>;
  setSaveStatus: React.Dispatch<React.SetStateAction<TSaveStatus>>;
};

const AutomaticThoughts: React.FC<AutomaticThoughtsProps> = ({
  data,
  currentStep,
  setData,
  setSaveStatus,
}) => {
  const [inputValue, setInputValue] = useState("");
  const handleHotThoughtClick = (index: number) => {
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
    setSaveStatus("unsaved");
  };

  const handleDelete = (index: number) => {
    setData((data) => {
      const newAutomaticThoughts = data.automaticThoughts.filter(
        (thought, i) => i !== index
      );
      return { ...data, automaticThoughts: newAutomaticThoughts };
    });
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.code === "Enter") {
      handleClick();
    }
  };

  const handleClick = () => {
    if (!inputValue) return;

    setData((data) => {
      return {
        ...data,
        automaticThoughts: [
          ...data.automaticThoughts,
          { thought: inputValue, isHot: false },
        ],
      };
    });
    setInputValue("");
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  if (currentStep !== 1) return null;
  return (
    <>
      <div className="form-control  mb-10">
        <label className="label flex  justify-start" htmlFor="ANT">
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
              id="ANT"
              maxLength={MAX_LENGTH}
              data-testid={ANTDataAtributes.addAntInput}
              type="text"
              placeholder="Im having the thought that..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              name="AddANT"
              className="sm:max-w-x-lg swiper-no-swiping input-bordered input w-full bg-white text-black"
            />
            <button
              data-testid={ANTDataAtributes.addAntBtn}
              type="button"
              onClick={handleClick}
              className="swiper-no-swiping btn-accent btn-square btn text-lg"
            >
              <FaPlusCircle />
            </button>
          </div>
          <label className="label">
            <span className="label-text-alt">
              <CharCountDisplay
                charLimit={MAX_LENGTH}
                currentCount={Number(inputValue.length ?? 0)}
              />
            </span>
          </label>
        </div>
      </div>

      <div>
        <div className="flex items-end justify-between">
          <div id="box-description" className="label">
            <Modal
              id={"hot-thought"}
              labelText={"Choose the hot thought"}
              title="Choose the Hot Thought"
              content={
                "Please choose the thought that is most closely related to your choosen strong mood. It is useful to consider each thought and listen to your body and see the reaction."
              }
            />
          </div>
        </div>

        <div
          aria-labelledby="box-description"
          role="listbox"
          className="swiper-no-swiping over h-48 w-full overflow-y-auto overscroll-contain rounded-lg bg-slate-300 p-2 "
        >
          <ul>
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
                className={`relative mb-2 block min-h-[100%] w-[100%] overflow-clip overflow-ellipsis rounded-xl bg-white p-1 pr-0 ${
                  thoughts?.isHot ? " border-red-500 bg-secondary " : ""
                }`}
              >
                <button
                  data-testid={ANTDataAtributes.toggleHotAntBtn}
                  role="option"
                  aria-selected={thoughts?.isHot}
                  className={`text-md mr-4 flex w-[90%]  cursor-pointer items-center p-2 text-left ${
                    thoughts?.isHot ? "text-gray-900" : "text-gray-900"
                  }`}
                  onClick={() => handleHotThoughtClick(index)}
                >
                  <span className="absolute top-3 left-4">
                    <FaFire
                      className={`min-h-[24px] text-sm ${
                        thoughts?.isHot ? "text-accent" : "text-gray-300"
                      } `}
                    />
                  </span>
                  <span className="text-md ml-8 mr-4 overflow-clip xs:mr-2">
                    {thoughts?.thought}
                  </span>
                </button>

                <button
                  data-testid={ANTDataAtributes.deleteAntBtn}
                  aria-label="Delete thought"
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
      </div>
    </>
  );
};

export default AutomaticThoughts;
