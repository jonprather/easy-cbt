import React, { useState, useEffect } from "react";
import { ChangeEvent } from "react";

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
      <div className="min-h-90 mx-auto flex flex-col justify-between p-2 pt-6  pb-6 xs:p-4 sm:bg-slate-800  sm:p-6 md:max-w-5xl md:rounded-b md:rounded-tl md:shadow-lg ">
        <form
          onKeyDown={handleKeyDown}
          onSubmit={handleSubmit}
          className=" min-h-73 mx-auto w-full rounded p-2 xs:p-4 sm:mt-4   sm:max-w-3xl sm:bg-slate-700 md:mt-10"
        >
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
        </form>

        <div className="   ">
          <PreviousAndNextButtons
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            columns={columns}
          />
        </div>

        {/* Bottom NAV looks p good can make use of on mobile */}
        <div className="btm-nav sm:hidden">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="btm-nav-label">Home</span>
          </button>
          <button className="active">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="btm-nav-label">Warnings</span>
          </button>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span className="btm-nav-label">Statics</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default CBTAppTemplate;
