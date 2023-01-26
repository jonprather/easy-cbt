import React, { useState } from "react";
import type { CBT_FormDataType } from "../types/CBTFormTypes";
import { ChangeEventHandler } from "react";
import Collapse from "./Collapse";
// TODO should i be usign prisma type is this type updated...
type newThoughtPropsI = {
  data: CBT_FormDataType;
  currentStep: number;
  errors: any;
  handleChange: ChangeEventHandler<HTMLTextAreaElement>;
};
const NewBalancedThought: React.FC<newThoughtPropsI> = ({
  data,
  currentStep,
  errors,
  handleChange,
}) => {
  // TODO so errors could be used but they are not cleanly mapped ie the names are diff and the indexs
  // wont nedd match bc obj
  if (currentStep !== 4) return null;

  return (
    <>
      <div className="form-control mb-10">
        <label className="label">
          <span className="label-text text-white">New Balanced Thought:</span>
        </label>
        <textarea
          className="textarea-bordered textarea h-24 bg-white text-black"
          placeholder="So while that may be partially true ..."
          value={data.newThought}
          onChange={handleChange}
          name="newThought"
        ></textarea>
        {errors?.newThought && (
          <div className="text-red-500">{errors.newThought}</div>
        )}
      </div>
      {/* Extract this all to own component to clean up sectiosn */}
      <Collapse evidence={data?.evidenceAgainst} title={"Evidence Against"} />
      <Collapse evidence={data?.evidenceFor} title={"Evidence For"} />
    </>
  );
};

export default NewBalancedThought;

// TODO if use stepper this way could also pass down errors to show for each label like mark them red
// and give msg

// TODO continue using daisyui to improve forms i worked on outsides but not all of them
// also settle bg colors on lg would be nice if worked on light mode as well
