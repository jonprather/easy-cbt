import React from "react";
import type { CBT_FormDataType } from "../types/CBTFormTypes";
import Collapse from "./Collapse";
import Modal from "./molecules/Modal";
import CharCountDisplay from "./atoms/CharacterCountDisplay";
import type { InputField } from "./organisms/CBTAppTemplate";

const MAX_LENGTH = 500;

type newThoughtPropsI = {
  data: CBT_FormDataType;
  currentStep: number;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    control: InputField["control"]
  ) => void;
};
const NewBalancedThought: React.FC<newThoughtPropsI> = ({
  data,
  currentStep,
  handleChange,
}) => {
  const content =
    "New evidence based belief after considering the evidence for and against your thought. Allow yourself to consider a rational point of view on this issue.";

  if (currentStep !== 4) return null;

  const handleNewThought = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange(e, "Text");
  };
  return (
    <>
      <div className="form-control mb-4">
        <div className=" flex items-end justify-between">
          <label className="label">
            <Modal
              id={"newThought-modal"}
              labelText={"New Balanced Thought"}
              title={"New Balanced Thought"}
              content={content}
            />
          </label>
        </div>

        <textarea
          maxLength={MAX_LENGTH}
          data-testid="newBalancedThoughtInput"
          className="textarea-bordered textarea h-44 resize-none bg-white text-black"
          placeholder="So while that may be partially true ..."
          value={data.newThought}
          onChange={handleNewThought}
          name="newThought"
        ></textarea>
        <label className="label">
          <span className="label-text-alt">
            <CharCountDisplay
              charLimit={MAX_LENGTH}
              currentCount={Number(data?.newThought?.length ?? 0)}
            />
          </span>
        </label>
      </div>
      <Collapse
        evidence={data?.evidenceFor}
        title={"Prior Step Context: Evidence For"}
      />
      <Collapse
        evidence={data?.evidenceAgainst}
        title={"Prior Step Context: Evidence Against"}
      />
    </>
  );
};

export default NewBalancedThought;
