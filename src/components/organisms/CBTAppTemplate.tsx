import React, { useState, useEffect } from "react";
import { ChangeEvent } from "react";
import Link from "next/link";
import FormNavSteps from "../FormNavSteps.tsx";
import type { CBT_FormDataType, CBT_FormSchema } from "../types/CBTFormTypes";
import NameAndRateMood from "../NameAndRateMood.tsx";
import AutomaticThoughts from "../AutomaticThoughts.tsx";
import PreviousAndNextButtons from "../PreviousAndNextButtons.tsx";
import Rerate from "../Rerate.tsx";
import { api } from "../../utils/api";
import Layout from "../Layout";
import NewBalancedThought from "src/components/NewBalancedThought";
import Evidence from "src/components/Evidence";
// import { cBT_FormDataType } from "@prisma/client";
// import { cBT_FormDataType } from "@prisma/client";
// TODO look up api new syntax
// import {trpc} from utils

const columns = ["Name", "ANTS", "For", "against", "New", "Rerate"];
// TODO
// could reuse the columns from nav steps here as well
const CBTAppTemplate: React.FC<CBT_FormDataType> = ({ initialData }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const getAllPosts = api.CBT.getAll.useQuery();
  const { mutate: updatePost } = api.CBT.update.useMutation();
  const utils = api.useContext();

  const { mutate: postMessage } = api.CBT.postMessage.useMutation();

  const [errors, setErrors] = React.useState(null);
  // TODO now that types are diff update ares that use old types ie setting nameMood obj
  // also use setData pass that down rather onChange handle change or something...
  const [data, setData] = useState<CBT_FormDataType>({
    name: "",
    moodName: "",
    moodLabel: "",
    moodRating: 1,
    automaticThoughts: [],
    evidenceFor: "",
    evidenceAgainst: "",
    newThought: "",
    rateBelief: 1,
    rerateEmotion: 1,
  });

  useEffect(() => {
    setData(
      initialData || {
        name: "",
        moodName: "",
        moodLabel: "",
        moodRating: 1,
        automaticThoughts: [],
        evidenceFor: "",
        evidenceAgainst: "",
        newThought: "",
        rateBelief: 1,
        rerateEmotion: 1,
      }
    );
  }, [initialData]);

  const handleHotThoughtClick = (index) => {
    setData((prev) => {
      const newThoughts = [...prev.automaticThoughts];
      newThoughts[index] = {
        ...newThoughts[index],
        isHot: !newThoughts[index].isHot,
      };
      return {
        ...prev,
        automaticThoughts: newThoughts,
      };
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  // TODO fix the submit on enter its not pleasant UX when happens at AT ...
  // ALSO put max char counts on all the text feilds...
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      //   CBT_Schema.parse(formValues);
      // So if going to reuse the form could do things differently ie
      //could use upsert in prisma pro 1 interface con id requirement wouldnt work for new things
      // could base it on if id is not a empty string if so update if not create new
      if (data.id) {
        console.log("updated post", data);
        // TODO next make a btn to load a post into the form data obj
        // so that on next submit it will be an update
        updatePost(data);
      } else {
        // Can also check if data has changed here like if its the same as default can prompt user
        postMessage(data);
      }

      setErrors({});
      setData((_) => {
        return {
          name: "",
          moodName: "",
          moodLabel: "",
          moodRating: 1,
          automaticThoughts: [],
          evidenceFor: "",
          evidenceAgainst: "",
          newThought: "",
          rateBelief: 1,
          rerateEmotion: 1,
        };
      });
    } catch (err: Error) {
      // const validationError = String(fromZodError(err));
      // // the error now is readable by the user

      // const errorArray = validationError.split("; ");
      // const errorObject = {};
      // errorArray.forEach((error) => {
      //   const key = error.match(/\"(.*?)\"/)[1];
      //   const message = error;
      //   errorObject[key] = message;
      // });
      // setErrors(errorObject);
      console.log(JSON.stringify(err));
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (currentStep !== columns.length - 1) {
        // event.preventDefault();
        // This is way too agressive I just want the form not to submit yet
        // i still want normal enter stuff to work
      }
    }
  };
  //   TODO zod controls for the boundaries or type guards

  return (
    <div className="sticky top-0">
      <FormNavSteps
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        errors={errors}
        columns={columns}
      />
      {/* TODO ok left off trying to make this bigger also was working on passing errors to tabs
      see todos */}
      <div className="min-h-60 mx-auto flex flex-col justify-between p-0 pb-6  xs:p-4 sm:bg-slate-800 sm:p-6  sm:pt-6 md:max-w-5xl md:rounded-b md:rounded-tl md:shadow-lg ">
        <form
          onKeyDown={handleKeyDown}
          onSubmit={handleSubmit}
          className=" min-h-70 mx-auto flex w-full flex-col justify-between rounded pl-2 pr-2 xs:p-4 sm:mt-4   sm:max-w-3xl sm:bg-slate-700 md:mt-10"
        >
          <div>
            <NameAndRateMood
              currentStep={currentStep}
              errors={errors}
              setData={setData}
              handleChange={handleChange}
              data={data}
            />
            <AutomaticThoughts
              handleHotThoughtClick={handleHotThoughtClick}
              setData={setData}
              handleChange={handleChange}
              data={data}
              currentStep={currentStep}
              errors={errors}
              handleChange={handleChange}
            />

            <Evidence
              data={data}
              handleChange={handleChange}
              evidence={data.evidenceFor}
              currentStep={currentStep}
              targetStep={2}
              errors={errors}
              title="Evidence Supporting the Thought"
              evidenceName={"evidenceFor"}
            />
            <Evidence
              data={data}
              evidence={data.evidenceAgainst}
              handleChange={handleChange}
              currentStep={currentStep}
              targetStep={3}
              errors={errors}
              title="Evidence against the thought"
              evidenceName={"evidenceAgainst"}
            />
            {/* TODO ok i left off creating these components next up fix ANTS and 
add collpase to rerate */}
            <NewBalancedThought
              data={data}
              handleChange={handleChange}
              currentStep={currentStep}
              errors={errors}
            />

            <Rerate
              currentStep={currentStep}
              errors={errors}
              data={data}
              setData={setData}
              columns={columns}
            />
          </div>
          {currentStep === columns.length - 1 && (
            <button
              type="submit"
              disabled={currentStep !== columns.length - 1}
              className="btn-accent btn   mb-2 min-w-full max-w-sm  xs:min-w-[14rem] sm:mx-auto "
            >
              {data.id ? "Update Entry" : "Add Entry"}
            </button>
          )}
        </form>

        <div className="mb-16  ">
          <PreviousAndNextButtons
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            columns={columns}
          />
        </div>
      </div>
    </div>
  );
};
export default CBTAppTemplate;
