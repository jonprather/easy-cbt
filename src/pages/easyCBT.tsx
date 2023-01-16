import * as React from "react";

import * as z from "zod";
import { fromZodError } from "zod-validation-error";
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

  const fillData = (setData) => {
    setData((prev): null => [
      {
        nameMood: "dep",
        rateMood: 5,
        automaticThoughts: "I am not good enough",
        evidenceFor: "I failed that test last week",
        evidenceAgainst: "I have received positive feedback from my colleagues",
        newThought:
          "I am capable of doing well, and one test does not define me",
        rateBelief: 3,
        rerateEmotion: 4,
      },
      {
        nameMood: "dep",
        rateMood: 2,
        automaticThoughts: "I am a failure",
        evidenceFor: "I lost my job last month",
        evidenceAgainst:
          "I have been actively looking for a new job and have had several interviews",
        newThought:
          "I am not a failure, I am taking steps to improve my situation",
        rateBelief: 2,
        rerateEmotion: 3,
      },
      {
        nameMood: "dep",
        rateMood: 4,
        automaticThoughts: "I am not happy",
        evidenceFor: "I have been feeling down lately",
        evidenceAgainst: "I have had moments of joy and laughter recently",
        newThought:
          "I am not always happy, but that does not mean I am not capable of happiness",
        rateBelief: 3,
        rerateEmotion: 3,
      },
    ]);
  };

  //   TODO do i want to make this columnular on desktop
  // Well lets do mobile first is this the mobile design
  //  I pictured somethign better bigger text input
  // Maybe react selects for teh emojis etc
  // number controls also zod controls for the boundaries or type guards

  return (
    <div className="container   p-10">
      <div className="mb-6 text-center">
        <h1 className="mb-4 text-4xl font-medium text-blue-500">
          EasyCBT Diary
        </h1>
        <p className="text-xl font-medium text-gray-600">
          Track your thoughts, moods and progress with CBT
        </p>
      </div>
      <form onSubmit={handleSubmit} className="rounded bg-blue-500 p-4">
        <label className="mt-4 block">
          Name Mood:
          <input
            type="text"
            name="nameMood"
            className="focus:shadow-outline block w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 leading-normal focus:outline-none"
          />
          {errors?.nameMood && (
            <div className="text-red-500">{errors.nameMood}</div>
          )}
        </label>
        <label className="mt-4 block">
          Rate Mood:
          <input
            type="text"
            name="rateMood"
            className="focus:shadow-outline block w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 leading-normal focus:outline-none"
          />
          {errors?.rateMood && (
            <div className="text-red-500">{errors.rateMood}</div>
          )}
        </label>

        <label className="mt-4 block">
          Automatic Thoughts:
          <textarea
            type="text-area"
            name="automaticThoughts"
            className="focus:shadow-outline block h-80 w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 leading-normal focus:outline-none"
          />
          {errors?.automaticThoughts && (
            <div className="text-red-500">{errors.automaticThoughts}</div>
          )}
        </label>
        <label className="mt-4 block">
          Evidence for the Thought:
          <input
            type="text"
            name="evidenceFor"
            className="focus:shadow-outline block h-80 w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 leading-normal focus:outline-none"
          />
          {errors?.evidenceFor && (
            <div className="text-red-500">{errors.evidenceFor}</div>
          )}
        </label>
        <label className="mt-4 block">
          Evidence Against the Thought:
          <input
            type="text"
            name="evidenceAgainst"
            className="focus:shadow-outline block w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 leading-normal focus:outline-none"
          />
          {errors?.evidenceAgainst && (
            <div className="text-red-500">{errors.evidenceAgainst}</div>
          )}
        </label>
        <label className="mt-4 block">
          New Balanced Thought:
          <input
            type="text"
            name="newThought"
            className="focus:shadow-outline block w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 leading-normal focus:outline-none"
          />
          {errors?.newThought && (
            <div className="text-red-500">{errors.newThought}</div>
          )}
        </label>
        <label className="mt-4 block">
          Rate Belief in New Thought:
          <input
            type="text"
            name="rateBelief"
            className="focus:shadow-outline block w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 leading-normal focus:outline-none"
            onBlur={() => (errors.rateBelief = "")}
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
           will need state for that i can access teh data data.rateMood etc and set it that way
          */}
          {errors?.rateBelief && (
            <div className="text-red-500">{errors.rateBelief}</div>
          )}
        </label>
        <label className="mt-4 block">
          Rerate Emotion:
          <input
            type="text"
            name="rerateEmotion"
            className="focus:shadow-outline block w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 leading-normal focus:outline-none"
          />
          {errors?.rerateEmotion && (
            <div className="text-red-500">{errors.rerateEmotion}</div>
          )}
        </label>
        <button
          type="submit"
          className="mt-6 rounded-lg border border-gray-400 bg-white py-2 px-4 font-semibold text-gray-800 hover:bg-gray-100"
        >
          Add Entry
        </button>
      </form>
      <div className="mb-6 mt-20 text-center">
        <h2 className="mb-4 text-3xl font-medium text-blue-500">
          Past Entries
        </h2>
      </div>
      {/* TODO make overflow nicer  */}
      <div className="container mt-4 overflow-x-auto ">
        <table className="text-gray w-full table-auto">
          <thead>
            <tr>
              <th className="bg-blue-500 p-2">Name Mood</th>

              <th className="bg-blue-500 p-2">Rate Mood</th>
              <th className="bg-blue-500 p-2">Automatic Thoughts</th>
              <th className="bg-blue-500 p-2">Evidence for the Thought</th>
              <th className="bg-blue-500 p-2">Evidence Against the Thought</th>
              <th className="bg-blue-500 p-2">New Balanced Thought</th>
              <th className="bg-blue-500 p-2">Rate Belief in New Thought</th>
              <th className="bg-blue-500 p-2">Rerate Emotion</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index}>
                <td className="td  p-2 text-white">{entry.nameMood}</td>
                <td className="td border-slate-800 bg-slate-500 p-2 text-white">
                  {entry.rateMood}
                </td>
                <td className="p-2  ">{entry.automaticThoughts}</td>
                <td className="border-spacing-2  bg-slate-500 p-2">
                  {entry.evidenceFor}
                </td>
                <td className="p-2 ">{entry.evidenceAgainst}</td>
                <td className="bg-slate-500  p-2">{entry.newThought}</td>
                <td className="p-2">{entry.rateBelief}</td>
                <td className="bg-slate-500  p-2">{entry.rerateEmotion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={() => fillData(setData)}> Click Me TO fill</button>
    </div>
  );
}
export default JournalTable;

// is this the design i want seems weird to have it the inputs as rows not columns but does make sense for mobile

// maybe can elaborate on some designs and check competitors etc

// TODO priritize the key parts and learnings Screw all this boring form validation shit
// can do that later
// lets test out the fun bits
// like save sessions
//have a nicer UI for past sessions

// TODO IDEAS make it steps liek checkout also has overview choose one it becomes main focus
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
