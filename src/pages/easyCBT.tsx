import React, { useState } from "react";

import FormNavSteps from "../components/FormNavSteps.tsx";
import Table from "../components/Table.tsx";
import * as z from "zod";
import { fromZodError } from "zod-validation-error";

import NameAndRateMood from "../components/NameAndRateMood.tsx";
import AutomaticThoughts from "../components/AutomaticThoughts.tsx";
import PreviousAndNextButtons from "../components/PreviousAndNextButtons.tsx";
import Rerate from "../components/Rerate.tsx";

// Can make a reusable component for evi for against and new
// its all very sim or can reuse teh components i uesd for automaticTHoughts
// that might work better to make a list that way
// Could add subtitles make it objects
const columns = ["Name", "ANTS", " for", "Against", "New", "Rerate"];
// TODO fix this type to be accurate then can use it to know prisma types
const CBT_Schema = z.object({
  nameMood: z.array(),
  rateMood: z.number().positive(),
  automaticThoughts: z.array(
    z.object({
      thought: z.string(),
      isHot: z.boolean(),
    })
  ),
  evidenceFor: z.string().nonempty(),
  evidenceAgainst: z.string().nonempty(),
  newThought: z.string().nonempty(),
  rateBelief: z.number().positive(),
  rerateEmotion: z.number().positive(),
});

type tableSchema = z.infer<typeof CBT_Schema>;

function JournalTable() {
  const [currentStep, setCurrentStep] = useState(0);

  const [errors, setErrors] = React.useState(null);
  const [data, setData] = React.useState({
    nameMood: [],
    rateMood: "",
    automaticThoughts: [],
    evidenceFor: "",
    evidenceAgainst: "",
    newThought: "",
    rateBelief: "",
    rerateEmotion: "",
  });

  // TODO  Do similar for mood and rating for the given mood maybe can not have multi
  // otherwise have to use similar logic
  const getHotThoughtsText = () => {
    let hotThoughts = data?.automaticThoughts
      ?.filter((thoughts) => thoughts.isHot)
      ?.map((thoughts) => thoughts.thought + "  🔥 ")
      ?.join(" - ");
    return hotThoughts;
  };
  //   TODO not sure how i want this designed is mutli moods really benificial?
  // Imean they can make a new table or i guess it could be nice to have that ability...
  const getMoodText = () => {
    let hotThoughts = data?.automaticThoughts
      ?.filter((thoughts) => thoughts.isHot)
      ?.map((thoughts) => thoughts.thought)
      ?.join(";");
    return hotThoughts;
  };
  const handleChange = (event, index) => {
    if (event.target.name === "automaticThoughts") {
      const newThoughts = [...data.automaticThoughts];
      newThoughts[index].thought = event.target.value;
      setData({ ...data, automaticThoughts: newThoughts });
    }
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formValues = {
      nameMood: formData.get("nameMood"),
      rateMood: Number(formData.get("rateMood")),
      automaticThoughts: formData.get("automaticThoughts"),
      evidenceFor: formData.get("evidenceFor"),
      evidenceAgainst: formData.get("evidenceAgainst"),
      newThought: formData.get("newThought"),
      rateBelief: Number(formData.get("rateBelief")),
      rerateEmotion: Number(formData.get("rerateEmotion")),
    };
    try {
      //   CBT_Schema.parse(formValues);
      // so parse mighght be too strick can use it as a warning anyway
      //   ie set some state and warn user but it doesnt matter as ill allow it..
      //   setData([...data, formValues]);

      setErrors({});
      setData((prevData) => {
        return {
          nameMood: [],
          rateMood: "",
          automaticThoughts: [],
          evidenceFor: "",
          evidenceAgainst: "",
          newThought: "",
          rateBelief: "",
          rerateEmotion: "",
        };
      });
    } catch (err: Error) {
      // Table is being auto set to current data i guess that will change when i use BE
      const validationError = String(fromZodError(err));
      // the error now is readable by the user

      const errorArray = validationError.split("; ");
      const errorObject = {};
      errorArray.forEach((error) => {
        const key = error.match(/\"(.*?)\"/)[1];
        const message = error;
        errorObject[key] = message;
      });
      setErrors(errorObject);
    }
  };

  //   TODO zod controls for the boundaries or type guards

  return (
    <div className=" bg-gray-100  pt-10 pb-80 md:p-20">
      <div className="mb-6 p-4 text-center">
        <h1 className="mb-4 text-4xl font-medium text-blue-500">
          EasyCBT Diary
        </h1>
        <p className="text-xl font-medium text-gray-600">
          Track your thoughts, moods and progress with CBT
        </p>
      </div>
      <div className="flex flex-col justify-between"></div>
      <div className="sticky top-0">
        <FormNavSteps
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          errors={errors}
          columns={columns}
        />
        {/* TODO ok left off trying to make this bigger also was working on passing errors to tabs
      see todos */}
        <div className="min-h-80 mx-auto flex flex-col  justify-between bg-blue-500  p-4 pt-6 pb-6 shadow-lg sm:p-6 md:max-w-5xl md:rounded-b md:rounded-tl">
          <form
            onSubmit={handleSubmit}
            className="min-h-60 mx-auto w-full rounded bg-gray-100  p-4  shadow sm:mt-4 sm:max-w-3xl md:mt-10"
          >
            <NameAndRateMood
              currentStep={currentStep}
              errors={errors}
              handleChange={handleChange}
              data={data}
            />
            <AutomaticThoughts
              setData={setData}
              data={data}
              currentStep={currentStep}
              errors={errors}
              handleChange={handleChange}
            />

            {currentStep === 2 && (
              <label className="mt-4 block">
                Evidence for the Thought:{" "}
                <span className=" text-red-500"> {getHotThoughtsText()}</span>
                <textarea
                  value={data.evidenceFor}
                  onChange={handleChange}
                  type="text-area"
                  name="evidenceFor"
                  className="focus:shadow-outline block h-52 w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 leading-normal focus:outline-none"
                />
                {errors?.evidenceFor && (
                  <div className="text-red-500">{errors.evidenceFor}</div>
                )}
              </label>
            )}

            {currentStep === 3 && (
              <label className="mt-4 block">
                Evidence Against the Thought:{" "}
                <span className=" text-red-500"> {getHotThoughtsText()}</span>
                <textarea
                  value={data.evidenceAgainst}
                  onChange={handleChange}
                  type="text-area"
                  name="evidenceAgainst"
                  className="focus:shadow-outline block h-52 w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 leading-normal focus:outline-none"
                />
                {errors?.evidenceAgainst && (
                  <div className="text-red-500">{errors.evidenceAgainst}</div>
                )}
              </label>
            )}
            {currentStep === 4 && (
              <label className="mt-4 block">
                New Balanced Thought:
                <textarea
                  value={data.newThought}
                  onChange={handleChange}
                  type="text-area"
                  name="newThought"
                  className="focus:shadow-outline block h-52 w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 leading-normal focus:outline-none"
                />
                {errors?.newThought && (
                  <div className="text-red-500">{errors.newThought}</div>
                )}
              </label>
            )}

            <Rerate
              currentStep={currentStep}
              errors={errors}
              data={data}
              handleChange={handleChange}
              columns={columns}
            />
          </form>

          <div className="   ">
            <PreviousAndNextButtons
              currentStep={currentStep}
              columns={columns}
            />
          </div>
        </div>
        {/* TODO fix for new ds */}
        {/* <Table setData={setData} data={data} /> */}
      </div>
    </div>
  );
}
export default JournalTable;

// TODO
// dont forget savablitilty
// auto saves
// also save progress

// multiple autothoughts mutil moods selectable..
{
  /* TODO could make this be a list where you can select the hot thought to work on...
        // But how would i handle the lis extract data and have it be part of table... and be an input
         */
}
{
  /* Also make it scale up onBlur or something or do the top bar then full ani so dont have to scroll
   */
}
{
  /* could also have overfolow and or let user size it */
}
{
  /* Also in the past tables list view could have pagination or cutt off then show more would be nice
          //FOR THAT  outputted table maybe a mre advaced lib would be sueful...
          */
}

// Could leave click to fill for examples....
// could have random examples in array and it can gen them to learn from
// can have a learning zone practice zone and normal zone (or modes...)

// For the form validation can have it be lax - like it can prompt you hey this isnt finished are you sure you want to
// submit
// but really could save it behind scenes anyway so being uncomplete is fine
// can allow incremental usage and review
// would be cool to be able to load table data back into it to review update it should be easy
// but again will need to handle state

// TODO could add two btns one for genereal info help and another for the advanced help
// TODO not storing anystate at this time when move tabs

// TODO reference things from earlie ras needed
