import React from "react";
import Link from "next/link";
import { api } from "../utils/api";
import dayjs from "dayjs";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import PuffLoader from "react-spinners/PuffLoader";
import type { cBT_FormDataType } from "@prisma/client";
import { CBTData } from "src/types/CBTFormTypes";
import { useSession } from "next-auth/react";
import Modal from "./molecules/Modal";

const Table = () => {
  const utils = api.useContext();
  const { data: sessionData } = useSession();

  const { mutate: deletePost } = api.CBT.delete.useMutation({
    onError: (err) => {
      // TODO IMPORTANT it seems to always succeed even when i throw an error in BE...
      // Which makes these toasts out to be liars...
      console.log(err);
      return toast.error(err.message, { toastId: err.message });
    },
    onSuccess: async () => {
      await utils.CBT.invalidate();
      // Why does it assume success ?
      toast.success("Succesfully deleted post!");
    },
  });
  const { data, isLoading } = api.CBT.getAll.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  const formatString = (str: string, maxLength: number) => {
    const words = str.split(" ");
    let shortString = words?.slice(0, maxLength)?.join(" ");

    if (words?.length > maxLength) {
      shortString += "...";
    }
    return shortString;
  };
  const formatDate = (entry: cBT_FormDataType) => {
    if (entry.updatedAt instanceof Date) {
      const dayjsDate = dayjs(String(entry.updatedAt));

      const now = dayjs();

      let formattedDate;
      if (dayjsDate.isSame(now, "day")) {
        formattedDate = dayjsDate.format("h:mm A");
      } else {
        formattedDate = dayjsDate.format("MMMM D, YYYY");
      }

      return formattedDate;
    }
  };

  // if (isError) return <p>Error</p>;
  if (!sessionData) {
    return (
      <div className="mb-6 mt-20 min-h-[16rem] text-center xs:p-2">
        {" "}
        <h2 className="mb-4 text-3xl font-medium text-white sm:mb-6 ">
          Past Entries
        </h2>
        <p className="mb-4 text-xl  text-white sm:mb-6 ">
          Sign in to save your posts!
        </p>
      </div>
    );
  }
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

        {data.map((entry: cBT_FormDataType, i) => (
          <div
            key={entry.id}
            className="card mb-4 min-h-[8rem] flex-row bg-primary pr-0 pl-6  text-primary-content shadow max-[375px]:w-80 xs:min-w-[20rem]  sm:mb-10 sm:hover:bg-primary-focus"
          >
            <div className=" flex flex-col justify-center ">
              <p className=" min-w-full items-center justify-center text-5xl ">
                {entry?.moodLabel?.slice(0, 2) || "😕"}
              </p>
            </div>

            <div className="card-body my-auto gap-0 justify-self-center  pr-0 pt-0 pl-4 pb-0">
              <h2 className="card-title text-ellipsis  text-left text-sm">
                {formatString(entry?.name ?? "", 5)}
              </h2>
              <p className="text-left text-sm">
                {/* TODO not sure why this is getting the type from prisma wrong
                i mean oh prob bc on Trpc
                */}
                {/* UNSAFE ANY IDK YET WHY HOW TO FIX>>>>> */}
                {formatDate(entry)}
              </p>
            </div>
            <div className="flex flex-row items-end justify-between gap-0 pb-2">
              <Link
                className="btn btn-ghost btn-sm mr-0 text-2xl"
                href={`/update/${entry.id}`}
              >
                <FaEdit />
              </Link>
              {/* TODO this modal isnt quite right the buttons are off */}
              <Modal
                title={"Are you sure you want to delete this entry?"}
                id={`delete-btn${i}`}
                labelText=""
                content={
                  <button
                    className="btn  btn-accent text-lg"
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
                  <span className=" btn btn-ghost btn-sm mr-1 bg-transparent text-xl">
                    <FaTrash />
                  </span>
                }
              />
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
