import React from "react";
import type { CBT_FormDataType } from "../types/CBTFormTypes";
import type { ChangeEventHandler } from "react";
import Modal from "./molecules/Modal";

import Collapse from "./Collapse";
import CharCountDisplay from "./atoms/CharacterCountDisplay";

const MAX_LENGTH = 500;
type newThoughtPropsI = {
  data: CBT_FormDataType;
  currentStep: number;
  targetStep: number;
  evidence: string;
  title: string;
  evidenceName: string;
  handleChange: ChangeEventHandler<HTMLTextAreaElement>;
};
const NewBalancedThought: React.FC<newThoughtPropsI> = ({
  data,
  currentStep,
  handleChange,
  title,
  targetStep,
  evidence,
  evidenceName,
}) => {
  let content = "";
  const arg =
    " using facts and evidence from your past. You can also consider what an honest friend might tell you. Finally Statistics and logic can also help. ";
  if (evidenceName == "evidenceFor") {
    content = "Argue to support the thought";
  } else {
    content = "Argue against the thought";
  }
  content = content + arg;

  if (currentStep !== targetStep) return null;

  return (
    <>
      <div className="form-control mb-4">
        <div className="flex items-end justify-between">
          <label className="label">
            <Modal
              id={evidenceName}
              labelText={title}
              title={title}
              content={content}
            />
          </label>
        </div>

        <textarea
          maxLength={MAX_LENGTH}
          data-testid={evidenceName}
          className="textarea-bordered textarea h-44 resize-none bg-white text-black"
          placeholder="The following Evidence suggests..."
          value={evidence}
          name={evidenceName}
          onChange={handleChange}
        ></textarea>
        <label className="label">
          <span className="label-text-alt">
            <CharCountDisplay
              charLimit={MAX_LENGTH}
              currentCount={Number(evidence.length ?? 0)}
            />
          </span>
        </label>
      </div>
      <Collapse
        evidence={data.automaticThoughts
          .filter((thought) => thought?.isHot)
          .map((ele) => ele?.thought)
          .join("\n")}
        title={"Prior Step Context: Hot Thoughts"}
      />
    </>
  );
};

export default NewBalancedThought;
