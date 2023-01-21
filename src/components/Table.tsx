import React, { useState } from "react";
import type { CBT_FormDataType } from "../types/CBTFormTypes";
import { api } from "../utils/api";

type TableProps = {
  data: CBT_FormDataType;
  setData: (data: CBT_FormDataType) => CBT_FormDataType;
};

const Table: React.FC<TableProps> = ({ setData, data }) => {
  const utils = api.useContext();

  const { mutate: deletePost } = api.CBT.delete.useMutation({
    onSettled: async () => {
      await utils.CBT.invalidate();
    },
  });
  const getAllPosts = api.CBT.getAll.useQuery();

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
        <table className="w-full table-auto text-white">
          <thead>
            <tr>
              {" "}
              {/* <th className="bg-blue-500 p-2">ID</th> */}
              <th className="bg-blue-500 p-2">Table Name</th>
              <th className="bg-blue-500 p-2">Name Mood</th>
              <th className="bg-blue-500 p-2">Rate Mood</th>
              <th className="bg-blue-500 p-2">Automatic Thoughts</th>
              <th className="bg-blue-500 p-2">Evidence for the Thought</th>
              <th className="bg-blue-500 p-2">Evidence Against the Thought</th>
              <th className="bg-blue-500 p-2">New Balanced Thought</th>
              <th className="bg-blue-500 p-2">Rate Belief in New Thought</th>
              <th className="bg-blue-500 p-2">Rerate Emotion</th>
              <th className="bg-blue-500 p-2">Delete</th>
            </tr>
          </thead>

          <tbody>
            {/* Can add id 
            also add button to open updata maybe reuse og forms
            idk if diff page 
            also button to delte based on id
            */}
            {getAllPosts.data?.map((entry, index) => (
              <tr key={entry.id} className="text-white">
                {/* <td className="td  p-2 text-white">{entry.id}</td> */}

                <td className="td  p-2 text-white">{entry.name}</td>
                <td className="td border-slate-800 bg-slate-500 p-2 text-white">
                  {entry.moodLabel}
                </td>
                <td className="td border-slate-800 bg-slate-500 p-2 text-white">
                  {entry.moodRating}
                </td>
                <td className="p-2  ">
                  {entry?.automaticThoughts?.map((thoughts, index) => {
                    return <span key={index}>{thoughts.thought}</span>;
                  })}
                </td>
                <td className="border-spacing-2  bg-slate-500 p-2">
                  {entry.evidenceFor}
                </td>
                <td className="p-2 ">{entry.evidenceAgainst}</td>
                <td className="bg-slate-500  p-2">{entry.newThought}</td>
                <td className="p-2">{entry.rateBelief}</td>
                <td className="bg-slate-500  p-2">{entry.rerateEmotion}</td>
                <td className="bg-slate-500  p-2">
                  <button
                    className="mt-6 rounded-lg border border-gray-400 bg-white py-2 px-4 font-semibold text-gray-900  hover:bg-gray-100"
                    onClick={() => deletePost({ id: entry.id })}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => fillData(setData)}
        className="mt-6 rounded-lg border border-gray-400 bg-white py-2 px-4 font-semibold  hover:bg-gray-100"
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
