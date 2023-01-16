import React, { useState } from "react";
import EmojiSelector from "../components/EmojiSelector.tsx";
import FormNavSteps from "../components/FormNavSteps.tsx";
import Table from "../components/Table.tsx";
import * as z from "zod";
import { fromZodError } from "zod-validation-error";
// Could add subtitles make it objects
const columns = ["Name", "ANTS", " for", "Against", "New", "Rerate"];
const CBT_Schema = z.object({
  nameMood: z.string().nonempty(),
  rateMood: z.number().positive(),
  automaticThoughts: z.string().nonempty(),
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
  const [data, setData] = React.useState([
    {
      nameMood: "",
      rateMood: "",
      automaticThoughts: "",
      evidenceFor: "",
      evidenceAgainst: "",
      newThought: "",
      rateBelief: "",
      rerateEmotion: "",
    },
  ]);
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
      CBT_Schema.parse(formValues);
      setData([...data, formValues]);

      setErrors({});
      //   setData([
      //     {
      //       nameMood: "",
      //       rateMood: "",
      //       automaticThoughts: "",
      //       evidenceFor: "",
      //       evidenceAgainst: "",
      //       newThought: "",
      //       rateBelief: "",
      //       rerateEmotion: "",
      //     },
      //   ]);
    } catch (err: Error) {
      const validationError = String(fromZodError(err));
      // the error now is readable by the user

      console.log(validationError.split(";"));
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

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };
  //   TODO zod controls for the boundaries or type guards

  return (
    <div className="pt-10 pb-40  md:p-20">
      <div className="mb-6 p-4 text-center">
        <h1 className="mb-4 text-4xl font-medium text-blue-500">
          EasyCBT Diary
        </h1>
        <p className="text-xl font-medium text-gray-600">
          Track your thoughts, moods and progress with CBT
        </p>
      </div>
      <FormNavSteps
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        errors={errors}
        columns={columns}
      />
      {/* TODO ok left off trying to make this bigger also was working on passing errors to tabs
      see todos */}
      <div className=" mx-auto bg-blue-500  p-2 pt-6 pb-6 shadow-lg sm:p-6 md:max-w-5xl md:rounded">
        <form
          onSubmit={handleSubmit}
          className="min-h-50 mx-auto rounded bg-white p-4  shadow sm:mt-4 sm:max-w-3xl md:mt-10"
        >
          {currentStep === 0 && (
            <label className="mt-4 block">
              Name Mood:
              <EmojiSelector />
              {errors?.nameMood && (
                <div className="text-red-500">{errors.nameMood}</div>
              )}
            </label>
          )}
          {currentStep === 0 && (
            <label className="mt-4 block">
              Rate Mood:
              <input
                type="number"
                min="1"
                max="100"
                name="rateMood"
                className="focus:shadow-outline block appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 pl-6 pr-6 leading-normal focus:outline-none"
              />
              {errors?.rateMood && (
                <div className="text-red-500">{errors.rateMood}</div>
              )}
            </label>
          )}
          {currentStep === 1 && (
            <label className="mt-4 block">
              Automatic Thoughts:
              <textarea
                type="text-area"
                name="automaticThoughts"
                className="focus:shadow-outline block  h-52  w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 leading-normal focus:outline-none"
              />
              {errors?.automaticThoughts && (
                <div className="text-red-500">{errors.automaticThoughts}</div>
              )}
            </label>
          )}

          {/* TODO get the hot thought selected (maybe could implement multi path function here
    like for hot thought 1 have one thing for hot thought 2 have another...
    so would have to make the evidence rest of form really be tied to that hot thought...
    hot thought would be primary ( but thas also tied to mood man that just got complicated)
    anyway
    // add teh current hot thought and relevant moods to the evidence for
    // but i think i will need to get the state first ie im not handling it until the end...
    like there is not value and onCHange on each thing
    // like would need to store the current value for that entry (current entry)
    //and seperate it from past entries which would come from db anyway
    //though could opt update add the newest i suppose..



    ) */}
          {currentStep === 2 && (
            <label className="mt-4 block">
              Evidence for the Thought:
              <textarea
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
              Evidence Against the Thought:
              <textarea
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
                type="text-area"
                name="newThought"
                className="focus:shadow-outline block h-52 w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 leading-normal focus:outline-none"
              />
              {errors?.newThought && (
                <div className="text-red-500">{errors.newThought}</div>
              )}
            </label>
          )}
          {currentStep === 5 && (
            <label className="mt-4 block">
              Rate Belief in New Thought:
              <input
                type="number"
                name="rateBelief"
                min="1"
                max="100"
                className="focus:shadow-outline w-22 block  rounded-lg border border-gray-300 bg-white py-2 px-4 leading-normal focus:outline-none"
                onBlur={() => console.log()}
                // (errors.rateBelief = "")
                onChange={(e) => {
                  setErrors((prev: tableSchema): tableSchema => {
                    return [{ ...prev, rateBelief: null }];
                  });
                  //  TODO THis resets it all on change which migh tbe jank
                  // also dont want to trigger errros until later..
                  setData((prev) => {
                    return [{ ...prev, rateBelief: e.target.value }];
                  });
                }}
              />
              {/* TODO im not handling on change not handling state only doing so on submit
           but i might want to implement autoSaves when person rests for a few secods and stuff has changed
           will need state for that i can access the data.rateMood etc and set it that way
          */}
              {errors?.rateBelief && (
                <div className="text-red-500">{errors.rateBelief}</div>
              )}
            </label>
          )}

          {currentStep === 5 && (
            <label className="mt-4 block">
              Rerate Emotion:
              <input
                type="number"
                min="1"
                max="100"
                name="rerateEmotion"
                className="focus:shadow-outline min-w-22 block appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 leading-normal focus:outline-none"
              />
              {errors?.rerateEmotion && (
                <div className="text-red-500">{errors.rerateEmotion}</div>
              )}
            </label>
          )}
          {currentStep === 5 && (
            <button
              type="submit"
              className="mt-6 rounded-lg border border-gray-400 bg-green-600 py-2 px-4 font-semibold text-white shadow-md hover:bg-gray-100"
            >
              Add Entry
            </button>
          )}
        </form>

        <div className="mx-auto flex gap-4 sm:max-w-3xl">
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={currentStep === 0}
            className={`mt-6 rounded-lg border border-gray-400 bg-white py-2 px-4 font-semibold shadow-sm  hover:bg-gray-100 ${
              currentStep === 0
                ? "bg-gray-500  text-white"
                : "bg-white text-gray-800"
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={currentStep === columns.length - 1}
            className={`mt-6 rounded-lg border border-gray-400 py-2  px-4 font-semibold text-white shadow-sm hover:bg-gray-100 ${
              currentStep === columns.length - 1
                ? "bg-gray-500"
                : "bg-green-500"
            }`}
          >
            Next
          </button>
        </div>
      </div>
      {/* <Table setData={setData} data={data} /> */}
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
