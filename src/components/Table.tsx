import React, { useState } from "react";
import type { CBT_FormDataType } from "../types/CBTFormTypes";
import { api } from "../utils/api";
// TODO extract api stuff to custom hook
// make custom hook call less
// table probably doesnt need to update that frequently
// also make the mutations optimisic

//TODO  Add react toastify on success and error

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
      JSON?.stringify(currentData?.automaticThoughts) !==
      JSON?.stringify(defaultData?.automaticThoughts)
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
        <h2 className="mb-4 text-3xl font-medium text-white">Past Entries</h2>
        {/* Add the delete and update buttons get icons for them */}
        {getAllPosts.data?.map((entry, i) => (
          <div
            key={i}
            className="card mt-10 w-96 bg-primary text-primary-content"
          >
            <div className="card-body">
              <h2 className="card-title">{entry?.name}</h2>
              <p className="text-xl">{entry?.moodLabel}</p>
              {/* <p className="text-xl">{entry?.}</p> */}

              <div className="card-actions justify-end">
                {/* <button className="btn-primary btn">Buy Now</button> */}
                <button
                  className="btn-neutral btn"
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

                <button
                  className="btn-ghost btn"
                  onClick={() => {
                    if (confirm("Are You sure you want to delete this?")) {
                      deletePost({ id: entry.id });
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
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
// note doesnt have to be Table i think it would be better as a list of cards
// with just info about the title and creation date maybe mood as well like the icon
// and can have icons for the edit and delete buttons as well
// also can have character limits on input so that doesnt get out of hand, and can show how many chars
// in file out of total
// oh i like the create icon at the button as well thought i can have a button
