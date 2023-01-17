import React, { useState } from "react";

const Table = ({ setData, data }) => {
  data = [data];
  //   let testData = data.map((entry, index) => {
  //     return entry.nameMood.map((mood) => {
  //       return mood;
  //     });
  //   });

  //   console.log("eg", testData, testData[0][0].value);
  //   so this will likely be for history of many tables...
  //  but for current for testing just fake it liek its in an array
  // can figure out how to display many things later vs just the new one
  console.log("data: __>", data);
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
  return (
    <>
      <div className="mb-6 mt-20 text-center">
        <h2 className="mb-4 text-3xl font-medium text-blue-500">
          Past Entries
        </h2>
      </div>
      <div className=" mt-4 overflow-x-auto ">
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
                <td className="td  p-2 text-white">
                  {entry?.nameMood?.map((mood) => (
                    <span>{mood.name}</span>
                  ))}
                </td>
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
      <button
        onClick={() => fillData(setData)}
        className="mt-6 rounded-lg border border-gray-400 bg-white py-2 px-4 font-semibold text-gray-800 hover:bg-gray-100"
      >
        {" "}
        Click Me TO fill
      </button>
    </>
  );
};

export default Table;

{
  /* TODO make overflow nicer  */
}
