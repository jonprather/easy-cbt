import React, { useState } from "react";
import Link from "next/link";
import { api } from "../utils/api";
import dayjs from "dayjs";
import {
  FaTrash,
  FaEdit,
  FaFilter,
  FaSearch,
  FaSortAlphaUp,
  FaSortAlphaDown,
  FaSortNumericDown,
  FaSortNumericUp,
  FaWindowClose,
} from "react-icons/fa";
import { toast } from "react-toastify";
import type { cBT_FormDataType } from "@prisma/client";
import { useSession } from "next-auth/react";
import Modal from "./molecules/Modal";
import SearchBar from "./molecules/Searchbar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import EmojiSelector from "./EmojiSelector";
import SortingComponent from "./molecules/SortingComponent";
import type { TSortOptionValues } from "./molecules/SortingComponent";
import { Popover, PopoverContent, PopoverTrigger } from "./molecules/Popover";
import { PuffLoader } from "react-spinners";
import { useIsFetching } from "@tanstack/react-query";
import ErrorMessage from "./molecules/ErrorMessage";

const Table = () => {
  const utils = api.useContext();
  const { data: sessionData } = useSession();
  const [searchQuery, setSearchQuery] = useState("");

  const [sortingOption, setSortingOption] = useState<TSortOptionValues>({
    direction: "desc",
    property: "updatedAt",
  });

  const [emojiData, setEmojiData] = useState({
    moodName: "",
    moodLabel: "",
  });

  const isFetching = useIsFetching();

  const handleMoodChange = (moodName: string, moodLabel: string) => {
    setEmojiData(() => {
      return {
        moodLabel,
        moodName,
      };
    });
  };

  // When user filters or sorts reset the page to 0
  React.useEffect(() => {
    setPage(0);
  }, [searchQuery, emojiData, sortingOption]);

  const { mutate: deletePost } = api.CBT.delete.useMutation({
    onError: (err) => {
      console.log(err);
      return toast.error(err.message, { toastId: err.message });
    },
    onSuccess: async () => {
      await utils.CBT.invalidate();
      toast.success("Succesfully deleted post!");
    },
  });

  const getSearchQuery = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };
  const { data, fetchNextPage, error } = api.CBT.getBatch.useInfiniteQuery(
    {
      limit: 4,

      searchQuery: searchQuery, // this is optional - remember replace with stuff want to filter by
      moodName: emojiData?.moodName, // this is optional - remember replace with stuff want to filter by
      sortBy: sortingOption, // Pass the sortingOption state object
    },
    {
      enabled: sessionData?.user !== undefined,
      staleTime: Infinity,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const [page, setPage] = useState(0);
  const handleFetchNextPage = () => {
    void fetchNextPage();
    setPage((prev) => prev + 1);
  };
  const toShow = data?.pages[page]?.items;
  const nextCursor = data?.pages[page]?.nextCursor;
  const pageTotal = data?.pages[0]?.pageCount;

  React.useEffect(() => {
    console.log("Page and total", pageTotal, page);
    if (!pageTotal) return;
    if (page > pageTotal) {
      setPage((prev) => {
        return prev - 1;
      });
    }
  }, [pageTotal, page]);

  const handleFetchPreviousPage = () => {
    setPage((prev) => prev - 1);
  };
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
  const emitSortingData = (option: TSortOptionValues) => {
    setSortingOption(option);
  };

  const getSortIcon = () => {
    if (sortingOption.property === "name") {
      if (sortingOption.direction === "asc") {
        return <FaSortAlphaUp />;
      } else {
        return <FaSortAlphaDown />;
      }
    }
    if (sortingOption.direction === "asc") {
      return <FaSortNumericUp />;
    } else {
      return <FaSortNumericDown />;
    }
  };

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

  return (
    <>
      <div className="mx-auto mb-6 mt-20 min-h-screen w-full min-w-[100%] max-w-[100%] pb-16 text-center xs:max-w-[100%] xs:p-2">
        <h2 className="mb-4 text-3xl font-medium text-white sm:mb-6 ">
          Past Entries
        </h2>
        <div className="nav-utitlies mb-10 flex w-full  items-center  justify-between rounded-xl six:pl-2 six:pr-2  xs:max-w-full   xs:bg-slate-800 xs:p-2">
          <div className="btn-group  ">
            <button
              data-testid="next-btn"
              onClick={handleFetchPreviousPage}
              disabled={page === 0}
              className="btn-neutral btn  text-lg "
            >
              <FaArrowLeft />
            </button>

            <div className="btn-neutral btn pointer-events-none font-semibold text-base-content shadow-md">
              <span>
                {pageTotal && pageTotal > 0 ? (
                  <>
                    <span className="inline-block min-w-[.5rem]">
                      {page + 1}
                    </span>{" "}
                    /{" "}
                    <span className="inline-block min-w-[.5rem]">
                      {pageTotal}
                    </span>
                  </>
                ) : (
                  <span className="inline-block min-w-[1rem]">0 / 0</span>
                )}
              </span>
            </div>

            <button
              data-testid="prev-btn"
              onClick={handleFetchNextPage}
              disabled={!nextCursor}
              className="btn-neutral btn text-lg  "
            >
              <FaArrowRight />
            </button>
          </div>
          <div className="">
            <Popover>
              <PopoverTrigger>
                <div
                  className={`btn-rounded btn-neutral btn rounded-full xs:mr-4 ${
                    searchQuery ? "bg-primary" : "bg-neutral"
                  } `}
                >
                  <span className={`  text-white`}>
                    <FaSearch />
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverContent className=" bg-slate-900 shadow-sm xs:w-96">
                <div className=" ">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none text-white">
                      Filter By Search
                    </h4>
                    <div className="mb-10  ">
                      {/* TODO make into larger search component */}

                      <SearchBar onSearch={getSearchQuery} />
                      {searchQuery && (
                        <>
                          <p className="mb-2">Searched:</p>

                          <button
                            onClick={() => setSearchQuery("")}
                            className="alert alert-success bg-neutral p-1 pl-4 text-white shadow-lg"
                          >
                            <div className="">
                              <span
                                className=" text max-w-[22ch]
                              overflow-hidden text-ellipsis "
                              >
                                {searchQuery.slice(0, 22)}
                              </span>
                            </div>
                            <span className="btn-neutral btn-ghost btn text-white">
                              <FaWindowClose />
                            </span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger>
                <div
                  className={`btn-rounded btn-neutral btn   rounded-full ${
                    emojiData?.moodName ? "bg-primary" : "bg-neutral"
                  } `}
                >
                  <span className={`  text-white`}>
                    <FaFilter />
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80   bg-slate-900 shadow-sm">
                <div className="grid gap-4 ">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none text-white">
                      Filter By Mood
                    </h4>
                    <div className="form-control text-left">
                      <EmojiSelector
                        moodName={emojiData.moodName}
                        moodLabel={emojiData.moodLabel}
                        onChange={handleMoodChange}
                      />
                      <p>
                        <button
                          className={`btn-neutral   btn mt-4 bg-primary  `}
                          disabled={!emojiData.moodName}
                          onClick={() =>
                            setEmojiData({ moodLabel: "", moodName: "" })
                          }
                        >
                          Reset Filter
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger>
                <div className="btn-rounded btn-neutral btn rounded-full  bg-neutral">
                  <span className="  text-white">{getSortIcon()}</span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80  bg-slate-900 text-white shadow-sm">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Sort</h4>
                    <SortingComponent
                      sortingOptions={sortingOption}
                      emitSortingData={emitSortingData}
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex justify-center">
          <PuffLoader
            loading={!!isFetching && !toShow?.length}
            color="white"
            size={150}
          />
          <ErrorMessage showMessage={!!error} message={error?.message} />
        </div>
        {!toShow?.length && (
          <div className="min-h-[38rem] min-w-[20rem]  xs:min-w-[30rem]"></div>
        )}
        {toShow?.map((entry: cBT_FormDataType, i) => (
          <div
            key={entry.id}
            className="card mx-auto mb-4 min-h-[8rem] min-w-[95%]  max-w-[95%] flex-row bg-slate-700 pr-0 pl-6 text-white  shadow sm:mb-10   sm:hover:bg-primary-focus "
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
    </>
  );
};
export default Table;
