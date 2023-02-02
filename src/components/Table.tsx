import React, { useState } from "react";
import type { CBT_FormDataType } from "../types/CBTFormTypes";
import Link from "next/link";
import { api } from "../utils/api";
import dayjs from "dayjs";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import PuffLoader from "react-spinners/PuffLoader";

const Table = () => {
  const utils = api.useContext();

  const { mutate: deletePost } = api.CBT.delete.useMutation({
    onSettled: async () => {
      await utils.CBT.invalidate();
      toast.success("Succesfully deleted post!");
    },
    onError: (err, updatedCartData, context) => {
      toast.error(err.message, { toastId: err.message });
    },
  });
  const { data, isLoading, isError } = api.CBT.getAll.useQuery();

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

  // if (isError) return <p>Error</p>;

  if (isLoading) {
    return (
      <div className="mb-6 mt-20 min-h-[16rem] text-center xs:p-2">
        <h2 className="mb-4 text-3xl font-medium text-white sm:mb-6 ">
          Past Entries
        </h2>
        <PuffLoader loading color="white" size={150} className="" />
      </div>
    );
  }

  if (!data)
    return (
      <div className="mb-6 mt-20 min-h-[16rem] text-center xs:p-2">
        <h2 className="mb-4 text-3xl font-medium text-white sm:mb-6 ">
          Past Entries
        </h2>
        <p>Nothing to show</p>
      </div>
    );

  return (
    <>
      <div className="mb-6 mt-20 text-center xs:p-2">
        <h2 className="mb-4 text-3xl font-medium text-white sm:mb-6 ">
          Past Entries
        </h2>

        {data?.map((entry, i) => (
          <div
            key={entry.id}
            className="card mb-4 min-h-[8rem] flex-row bg-primary  pr-0 pl-6 text-primary-content max-[375px]:w-80  xs:min-w-[20rem] sm:mb-10"
          >
            <div className=" flex flex-col justify-center ">
              <p className=" min-w-full items-center justify-center text-5xl ">
                {entry?.moodLabel?.slice(0, 2) || "NA"}
              </p>
            </div>

            <div className="card-body my-auto gap-0 justify-self-center  pr-0 pt-0 pl-4 pb-0">
              <h2 className="card-title text-ellipsis  text-left text-sm">
                {formatString(entry?.name, 5)}
              </h2>
              <p className="text-left text-sm">
                {formatDate(entry?.updatedAt)}
              </p>
            </div>
            <div className="flex flex-row items-end justify-end gap-0 pb-2">
              <Link
                className="btn-ghost btn-sm btn text-xl"
                href={`/update/${entry.id}`}
              >
                <FaEdit />
              </Link>

              <label
                htmlFor={`my-modal-${i}`}
                className="btn-ghost btn-sm btn text-lg"
              >
                <FaTrash />
              </label>

              <input
                type="checkbox"
                id={`my-modal-${i}`}
                className="modal-toggle"
              />
              <div className="modal">
                <div className="modal-box relative">
                  <label
                    htmlFor={`my-modal-${i}`}
                    className="btn-sm btn-circle btn absolute right-2 top-2"
                  >
                    ✕
                  </label>
                  <h3 className="text-lg font-bold text-white">
                    Are you sure you want to delete this entry?
                  </h3>
                  <p className="py-5 text-white">
                    <button
                      className="btn-accent  btn text-lg"
                      onClick={() => {
                        deletePost({ id: entry.id });
                      }}
                    >
                      <span className="mr-2">
                        <FaTrash />
                      </span>
                      Delete
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Table;

// TODO add infinite scroll pagination
// TODO  can add sorts and filter by emo type or date orstrong moods...

// also can have character limits on input so that doesnt get out of hand, and can show how many chars
// in file out of total
// oh i like the create icon at the button as well thought i can have a button
