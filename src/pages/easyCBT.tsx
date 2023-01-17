import React, { useState } from "react";
import EmojiSelector from "../components/EmojiSelector.tsx";
import FormNavSteps from "../components/FormNavSteps.tsx";
import Table from "../components/Table.tsx";
import * as z from "zod";
import { fromZodError } from "zod-validation-error";
// Could add subtitles make it objects
const columns = ["Name", "ANTS", " for", "Against", "New", "Rerate"];
const CBT_Schema = z.object({
  nameMood: z.array(),
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
  const [automaticThoughts, setAutomaticThoughts] = useState([]);
  const [errors, setErrors] = React.useState(null);

  const handleChange = (event) => {
    if (event.target.name === "automaticThoughts") {
      setAutomaticThoughts([...automaticThoughts, event.target.value]);
      return;
    }
    console.log("EVENT", event);
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
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
      //   TODO ok i was trying to get tabel working also on submit doesnt clear table

      // Table is being auto set to current data i guess that will change when i use BE
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
  let textInput = React.createRef();
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setData((prev) => {
        return {
          ...prev,
          automaticThoughts: [...data.automaticThoughts, event.target.value],
        };
      });
    }
    // so handlechange is already doing updates so what is this for?
    // should just be to add new lis not set data right?
  };
  const handleAutomaticThoughtsKeyDown = (event) => {
    if (event.key === "Enter") {
      setData((prevData) => {
        return {
          ...prevData,
          automaticThoughts: [
            ...prevData.automaticThoughts,
            event.target.value,
          ],
        };
      });
    }
  };
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
            {currentStep === 0 && (
              <label className="mt-4 block">
                Name Mood:
                {console.log("HANDLE CHANGE RIGHT B$", handleChange)}
                <EmojiSelector
                  nameMood={data.nameMood}
                  onChange={handleChange}
                />
                {errors?.nameMood && (
                  <div className="text-red-500">{errors.nameMood}</div>
                )}
              </label>
            )}
            {currentStep === 0 && (
              <label className="mt-4 block">
                Rate Mood:
                <input
                  value={data.rateMood}
                  onChange={handleChange}
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
              // TODO make this overflow correctly also make the
              <div className={"bg-gray-100 sm:h-80"}>
                <label className="mt-4 block ">
                  Automatic Thoughts:
                  <input
                    type="text"
                    name="automaticThoughts"
                    ref={textInput}
                    className="focus:shadow-outline block    w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 leading-normal focus:outline-none"
                  />
                </label>
                <div className="flex justify-start ">
                  <button
                    onClick={(e) => {
                      setAutomaticThoughts([
                        ...automaticThoughts,
                        textInput.current.value,
                      ]);
                      textInput.current.value = "";
                    }}
                    className="mt-6 mb-3 rounded-lg border border-gray-400 bg-blue-600 py-2 px-4 font-semibold text-white shadow-md hover:bg-blue-700"
                  >
                    {" "}
                    Add Thought
                  </button>
                  <h3 className="semibold my-auto p-2 text-lg font-medium">
                    Thought List
                  </h3>
                </div>
                <div className="h-36 overflow-y-scroll bg-white p-2 md:h-52 ">
                  {automaticThoughts.map((thought, index) => (
                    <li key={index}>{thought}</li>
                  ))}
                </div>

                {errors?.automaticThoughts && (
                  <div className="text-red-500">{errors.automaticThoughts}</div>
                )}
              </div>
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
                Evidence Against the Thought:
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
            {currentStep === 5 && (
              <label className="mt-4 block">
                Rate Belief in New Thought:
                <input
                  type="number"
                  name="rateBelief"
                  value={data.rateBelief}
                  min="1"
                  max="100"
                  className="focus:shadow-outline w-22 block  rounded-lg border border-gray-300 bg-white py-2 px-4 leading-normal focus:outline-none"
                  onBlur={() => console.log()}
                  // (errors.rateBelief = "")
                  onChange={handleChange}
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
                  onChange={handleChange}
                  value={data.rerateEmotion}
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
                className="mt-6 rounded-lg border border-gray-400 bg-green-600 py-2 px-4 font-semibold text-white shadow-md hover:bg-green-700"
              >
                Add Entry
              </button>
            )}
          </form>

          <div className="   ">
            <div className=" m-auto flex flex-row justify-between  sm:max-w-3xl">
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={currentStep === 0}
                className={`mt-6 rounded-lg border border-gray-400 bg-white py-2 px-4 font-semibold shadow-sm   ${
                  currentStep === 0
                    ? "bg-gray-500  text-white"
                    : "bg-white text-gray-800 text-white hover:bg-gray-200"
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={currentStep === columns.length - 1}
                className={`mt-6 rounded-lg border border-gray-400 py-2  px-4 font-semibold text-white shadow-sm  ${
                  currentStep === columns.length - 1
                    ? "bg-gray-500 "
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <Table setData={setData} data={data} />
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

// TODO set up the text area li stuff
//  and ability to select hot thought and moods to work on
//  maybe multi rate moods in both areas...
// reference things from earlie ras needed
