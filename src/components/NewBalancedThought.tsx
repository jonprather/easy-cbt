import React from "react";
import type { CBT_FormDataType } from "../types/CBTFormTypes";
import { ChangeEventHandler } from "react";
import Collapse from "./Collapse";
import Modal from "./molecules/Modal";
import { Tooltip } from "react-tooltip";
import { FaInfoCircle } from "react-icons/fa";
// TODO should i be using prisma type is this type updated...?
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
  const content =
    "New evidence based belief after considering the evidence for and against your thought. Allow yourself to consider a rational point of view on this issue.";
  const TOOLTIP_NEWTHOUGHT_ID = "TOOLTIP_NEWTHOUGHT_ID";

  if (currentStep !== 4) return null;

  return (
    <>
      <div className="form-control mt-4 mb-10">
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
          className="textarea-bordered textarea h-24 bg-white text-black"
          placeholder="So while that may be partially true ..."
          value={data.newThought}
          onChange={handleChange}
          name="newThought"
        ></textarea>
        {/* {errors?.newThought && (
          <div className="text-red-500">{errors.newThought}</div>
        )} */}
      </div>
      <Collapse evidence={data?.evidenceFor} title={"Evidence For"} />
      <Collapse evidence={data?.evidenceAgainst} title={"Evidence Against"} />

      {[
        {
          id: TOOLTIP_NEWTHOUGHT_ID,
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
