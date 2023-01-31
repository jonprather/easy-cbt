import React, { useState } from "react";
import type { CBT_FormDataType } from "../types/CBTFormTypes";
import { ChangeEventHandler } from "react";
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
  // wont nedd match bc obj
  if (currentStep !== targetStep) return null;

  //   I feel like i could have another layer of abstraction here since so many of these are the same
  return (
    <>
      <div className="form-control mt-4 mb-10">
        <label className="label">
          <span className="label-text capitalize text-white">{title}</span>
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
      {/* Extract this all to own component to clean up sectiosn */}
      <Collapse
        evidence={data.automaticThoughts
          .filter((thought) => thought?.isHot)
          .map((ele) => ele.thought)
          .join("\n")}
        title={"Hot Thoughts"}
      />
    </>
    // Seems like another orgamism made out of more molecules very similar
  );
};

export default NewBalancedThought;

// TODO if use stepper this way could also pass down errors to show for each label like mark them red
// and give msg

// TODO continue using daisyui to improve forms i worked on outsides but not all of them
// also settle bg colors on lg would be nice if worked on light mode as well
