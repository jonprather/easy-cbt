import React, { useState } from "react";
import type { CBT_FormDataType } from "../types/CBTFormTypes";
import { api } from "../utils/api";
// TODO extract api stuff to custom hook
// make custom hook call less
// table probably doesnt need to update that frequently
// also make the mutations optimisic
type TableProps = {
  formData: CBT_FormDataType;
  setData: (data: CBT_FormDataType) => CBT_FormDataType;
};

const Table: React.FC<TableProps> = ({ setData, formData }) => {
  const utils = api.useContext();

  const { mutate: deletePost } = api.CBT.delete.useMutation({
    onSettled: async () => {
      await utils.CBT.invalidate();
    },
  });
  const getAllPosts = api.CBT.getAll.useQuery();
  // So this works comparing to default but doesnt tell you if you loaded something then clicked again
  // idk if thats  enough of an issue
  // but maybe it would be better to compare current form data to current table data as well
  // so if current form === default then go ahead
  // if its different is it the same as the taable in
  // seems pretty minor
  // TODO add see more extension buttons to the long text also can make jus tthe hot thoughts visiable and or indicate them in red

  function hasDataChanged(
    currentData: CBT_FormDataType,
    defaultData: CBT_FormDataType = {
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
  ) {
    if (
      JSON.stringify(currentData.automaticThoughts) !==
      JSON.stringify(defaultData.automaticThoughts)
    ) {
      return true;
    }
    return Object.entries(currentData).some(
      ([key, value]) =>
        key !== "automaticThoughts" && currentData[key] !== defaultData[key]
    );
  }

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
              <th className="bg-blue-500 p-2">Update</th>
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
                    return (
                      <span
                        key={index}
                        className={`"text-gray-900" ${
                          thoughts.isHot && "text-red-600"
                        }`}
                      >
                        {thoughts.thought}
                        <br />
                      </span>
                    );
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
                    onClick={() => {
                      // how do i determine if the form has data...
                      const text =
                        "You sure you want to load in an update It will Replace your current Form entry?";

                      const dataChanged = hasDataChanged(formData);
                      if (!dataChanged) {
                        setData((prev) => {
                          return entry;
                        });
                        return;
                      }
                      if (confirm(text)) {
                        setData((prev) => {
                          return entry;
                        });
                      }
                    }}
                  >
                    Update
                  </button>
                </td>
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
    </>
  );
};

export default Table;

{
  /* TODO make overflow nicer  */
}

{
  /* TODO make sure for update Btn it doesnt delete current add a confirm if there is already data
                   are you sure this will delete your current data unless its saved but can still warn about overwrite
                   
                  */
}

// TODO  can add sorts and filter by emo type or date orstrong moods...
