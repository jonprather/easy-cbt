import React from "react";
import type { CBT_FormDataType } from "../types/CBTFormTypes";
import type { ChangeEventHandler } from "react";
import Modal from "./molecules/Modal";

import Collapse from "./Collapse";
// TODO should i be usign prisma type is this type updated...
type newThoughtPropsI = {
  data: CBT_FormDataType;
  currentStep: number;
  targetStep: number;
  evidence: string;
  errors: any;
  title: string;
  evidenceName: string;
  handleChange: ChangeEventHandler<HTMLTextAreaElement>;
};
const NewBalancedThought: React.FC<newThoughtPropsI> = ({
  data,
  currentStep,
  errors,
  handleChange,
  title,
  targetStep,
  evidence,
  evidenceName,
}) => {
  // TODO so errors could be used but they are not cleanly mapped ie the names are diff and the indexs

  let content = "";
  const arg =
    " using facts and evidence from your past as well. You can also consider what an honest friend might tell you. Finally Statistics and logic can also help. ";
  if (evidenceName == "evidenceFor") {
    content = "Argue to support the thought";
  } else {
    content = "Argue against the thought";
  }
  content = content + arg;

  if (currentStep !== targetStep) return null;

  return (
    <>
      <div className="form-control mt-4 mb-10">
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
          className="textarea-bordered textarea h-24 bg-white text-black"
          placeholder="The following Evidence suggests..."
          value={evidence}
          name={evidenceName}
          onChange={handleChange}
        ></textarea>
        {/* {errors?.evidenceName && (
          <div className="text-red-500">{errors.evidenceName}</div>
        )} */}
      </div>
      <Collapse
        evidence={data.automaticThoughts
          .filter((thought) => thought?.isHot)
          .map((ele) => ele?.thought)
          .join("\n")}
        title={"Hot Thoughts"}
      />
    </>
  );
};

export default NewBalancedThought;

// TODO if use stepper this way could also pass down errors to show for each label like mark them red
// and give msg
