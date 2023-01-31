import React, { useState } from "react";
import type { CBT_FormDataType } from "../types/CBTFormTypes";
import Link from "next/link";
import { api } from "../utils/api";
import dayjs from "dayjs";
import { FaTrash, FaEdit } from "react-icons/fa";
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
  const formatString = (str: string, maxLength: number) => {
    const words = str.split(" ");
    let shortString = words?.slice(0, maxLength)?.join(" ");

    if (words?.length > maxLength) {
      shortString += "...";
    }
    return shortString;
  };
  const formatDate = (date) => {
    const dayjsDate = dayjs(date);
    const now = dayjs();

    let formattedDate;
    if (dayjsDate.isSame(now, "day")) {
      formattedDate = dayjsDate.format("h:mm A");
    } else {
      formattedDate = dayjsDate.format("MMMM D, YYYY");
    }

    return formattedDate;
  };
  return (
    <>
      <div className="mb-6 mt-20 text-center xs:p-2">
        <h2 className="mb-4 text-3xl font-medium text-white sm:mb-6 ">
          Past Entries
        </h2>
        {/* Add the delete and update buttons get icons for them */}
        {getAllPosts.data?.map((entry, i) => (
          <div
            key={i}
            className="min-w card mb-4 min-h-[8rem] flex-row  bg-primary pr-0 pl-6 text-primary-content  max-[375px]:w-80 sm:mb-10"
          >
            <div className=" flex flex-col justify-center ">
              <p className=" min-w-full items-center justify-center text-5xl ">
                {entry?.moodLabel?.slice(0, 2) || "NA"}
              </p>
            </div>

            <div className="card-body my-auto gap-0 justify-self-center  pr-0 pt-0 pl-4 pb-0">
              {/* TODO fix card i think break it into secitons so that the text is more vertically centered
                added creat and update info day just and funcitons to format now just fudgin with the styles
              
              */}
              <h2 className="card-title text-ellipsis  text-left text-sm">
                {formatString(entry?.name, 5)}
              </h2>
              <p className="text-left text-sm">
                {/* {String(entry.updatedAt) !== String(entry?.createdAt)
                  ? "Updated: " + formatDate(entry?.updatedAt)
                  : "Created " + formatDate(entry?.createdAt)} */}
                {formatDate(entry?.updatedAt)}
              </p>
            </div>
            <div className="flex flex-row items-end justify-end gap-0 pb-2">
              <Link
                className="btn-ghost btn-sm btn text-2xl"
                href={`/update/${entry.id}`}
              >
                <FaEdit />
              </Link>

              <button
                className="btn-ghost btn-sm btn text-xl"
                onClick={() => {
                  if (confirm("Are You sure you want to delete this?")) {
                    deletePost({ id: entry.id });
                  }
                }}
              >
                <FaTrash />
              </button>
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
