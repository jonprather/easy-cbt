import React, { useState } from "react";
import type { cBT_FormDataType } from "@prisma/client";

import { PuffLoader } from "react-spinners";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";

import Alert from "../molecules/Alert";

import Modal from "../molecules/Modal";

import formatDate from "src/utils/FormatDate";
import formatString from "src/utils/FormatString";

interface EntryCardListProps {
  isFetching: boolean;
  errorMessage: string;
  toShow: cBT_FormDataType[] | null;
  deletePost: ({ id }: { id: string }) => void;
}

const EntryCardList: React.FC<EntryCardListProps> = ({
  isFetching,
  errorMessage,
  toShow,
  deletePost,
}) => {
  const [alertIsVisible, setAlertIsVisible] = useState(true);

  if (errorMessage) {
    return (
      <Alert
        message={errorMessage}
        type="error"
        alertIsVisible={alertIsVisible}
        setAlertIsVisible={setAlertIsVisible}
      />
    );
  }
  return (
    <div>
      <div className="flex justify-center">
        <PuffLoader
          loading={!!isFetching && !toShow?.length}
          color="white"
          size={150}
        />
      </div>
      {!toShow?.length && (
        <div className="min-h-[38rem] min-w-[20rem] xs:min-w-[30rem]"></div>
      )}
      {toShow?.map((entry: cBT_FormDataType, i) => (
        <div
          key={entry.id}
          className="card mx-auto mb-4 min-h-[8rem] min-w-[95%] max-w-[95%] flex-row bg-slate-700 pr-0 pl-6 text-white shadow sm:mb-10 sm:hover:bg-primary-focus"
        >
          <div className=" flex flex-col justify-center ">
            <p className=" min-w-full items-center justify-center text-5xl ">
              {entry?.moodLabel?.slice(0, 2) || "😕"}
            </p>
          </div>

          <div className="card-body my-auto gap-0 justify-self-center overflow-hidden text-ellipsis  pr-0 pt-0 pl-4 pb-0">
            <h2 className="card-title text-left text-sm">
              {formatString(entry?.name ?? "", 5)}
            </h2>
            <p className="text-left text-sm">{formatDate(entry)}</p>
          </div>
          <div className="flex flex-row items-end justify-between gap-0 pb-2">
            <Link
              className="btn-ghost btn-sm btn mr-0 text-xl text-yellow-100"
              href={`/update/${entry.id}`}
            >
              <FaEdit />
            </Link>
            <Modal
              title={"Are you sure you want to delete this entry?"}
              id={`delete-btn${i}`}
              labelText=""
              content={
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
              }
              icon={
                <span className=" btn-ghost btn-sm btn mr-1 bg-transparent text-lg text-yellow-100">
                  <FaTrash />
                </span>
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EntryCardList;
