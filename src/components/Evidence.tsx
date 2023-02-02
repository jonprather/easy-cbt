import React from "react";
import type { CBT_FormDataType } from "../types/CBTFormTypes";
import type { ChangeEventHandler } from "react";
import { Tooltip } from "react-tooltip";
import { FaInfoCircle } from "react-icons/fa";

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
  if (evidenceName == "evidenceFor") {
    content = "Argue to support the thought";
  } else {
    content = "Argue against the thought";
  }
  const TOOLTIP_EVIDENCE_ID = "toolTipEvidenceId";
  if (currentStep !== targetStep) return null;

  return (
    <>
      <div className="form-control mt-4 mb-10">
        <label className="label flex items-end justify-start">
          <span className="label-text  capitalize text-white">{title}</span>
          <span
            id={TOOLTIP_EVIDENCE_ID}
            className="text-md ml-2  bg-inherit p-0"
          >
            <FaInfoCircle />
          </span>
        </label>

        <textarea
          className="textarea-bordered textarea h-24 bg-white text-black"
          placeholder="The following Evidence suggests..."
          value={evidence}
          name={evidenceName}
          onChange={handleChange}
        ></textarea>
        {errors?.evidenceName && (
          <div className="text-red-500">{errors.evidenceName}</div>
        )}
      </div>
      <Collapse
        evidence={data.automaticThoughts
          .filter((thought) => thought?.isHot)
          .map((ele) => ele.thought)
          .join("\n")}
        title={"Hot Thoughts"}
      />

      {[
        {
          id: TOOLTIP_EVIDENCE_ID,
          content,
        },
      ].map((toolTip) => {
        return (
          <Tooltip
            key={toolTip.id}
            anchorId={toolTip.id}
            content={toolTip.content}
            events={["click", "hover"]}
            className="bg-primary"
            variant="light"
          />
        );
      })}
    </>
  );
};

export default NewBalancedThought;

// TODO if use stepper this way could also pass down errors to show for each label like mark them red
// and give msg
