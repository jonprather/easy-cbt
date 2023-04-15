import React, { useState } from "react";
import Link from "next/link";
import { api } from "../utils/api";
import dayjs from "dayjs";
import {
  FaTrash,
  FaEdit,
  FaFilter,
  FaSort,
  FaSearch,
  FaSortUp,
  FaSortDown,
  FaSortAlphaUp,
  FaSortAlphaDown,
  FaSortNumericDown,
  FaSortNumericUp,
} from "react-icons/fa";
import { toast } from "react-toastify";
import PuffLoader from "react-spinners/PuffLoader";
import type { cBT_FormDataType } from "@prisma/client";
import { CBTData } from "src/types/CBTFormTypes";
import { useSession } from "next-auth/react";
import Modal from "./molecules/Modal";
import SearchBar from "./molecules/Searchbar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import EmojiSelector from "./EmojiSelector";
import SortingComponent from "./molecules/SortingComponent";
import type { SortOption } from "./molecules/SortingComponent";
import { Popover, PopoverContent, PopoverTrigger } from "./molecules/Popover";

// import { NavigationMenu } from "./molecules/NavigationMenu";

const Table = () => {
  const utils = api.useContext();
  const { data: sessionData } = useSession();
  const [searchQuery, setSearchQuery] = useState("");

  const [sortingOption, setSortingOption] = useState<SortOption>({
    direction: "asc",
    property: "id",
  });

  const [emojiData, setEmojiData] = useState({
    moodName: "",
    moodLabel: "",
  });

  const handleMoodChange = (moodName: string, moodLabel: string) => {
    setEmojiData(() => {
      return {
        moodLabel,
        moodName,
      };
    });
  };
  {
  }

  // When user filters or sorts reset the page to 0
  React.useEffect(() => {
    setPage(0);
    // Also when user deletes and the total page count changes should update
  }, [searchQuery, emojiData, sortingOption]);
  // deps need to be the filter and sort statechange

  const getSortIcon = () => {
    if (sortingOption.property === "name") {
      if (sortingOption.direction === "asc") {
        return <FaSortAlphaUp />;
      } else {
        return <FaSortAlphaDown />;
      }
    }
    if (sortingOption.direction === "asc") {
      return <FaSortNumericDown />;
    } else {
      return <FaSortNumericUp />;
    }
  };
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
  // const { data, isLoading } = api.CBT.getAll.useQuery(undefined, {
  //   enabled: sessionData?.user !== undefined,
  // });
  const getSearchQuery = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };
  const { data, fetchNextPage, isLoading } = api.CBT.getBatch.useInfiniteQuery(
    {
      limit: 4,

      searchQuery: searchQuery, // this is optional - remember replace with stuff want to filter by
      moodName: emojiData?.moodName, // add useState and input for this
      sortBy: sortingOption, // Pass the sortingOption state object
    },
    {
      enabled: sessionData?.user !== undefined,
      staleTime: Infinity,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
  // Can reuse mood selector and this time make it work with a useSte here
  // so pass it the setState for setMoodNameQuery then i think it will work then its up to me how to design UI
  // can also add a sort by proptery and by asc or desc
  // look up UIS for thsi
  const [page, setPage] = useState(0);
  const handleFetchNextPage = () => {
    void fetchNextPage();
    setPage((prev) => prev + 1);
  };
  const toShow = data?.pages[page]?.items;
  // figure out last page
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
  const emitSortingData = (option: SortOption) => {
    setSortingOption(option);
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
  // if (isLoading) {
  //   return (
  //     <div className="mb-6 mt-20 min-h-[16rem] text-center xs:p-2">
  //       <h2 className="mb-4 text-3xl font-medium text-white sm:mb-6 ">
  //         Past Entries
  //       </h2>
  //       <PuffLoader loading color="white" size={150} className="" />
  //     </div>
  //   );
  // }

  // if (!data)
  //   return (
  //     <div className="mb-6 mt-20 min-h-[16rem] text-center xs:p-2">
  //       <h2 className="mb-4 text-3xl font-medium text-white sm:mb-6 ">
  //         Past Entries
  //       </h2>
  //       <p>Nothing to show</p>
  //     </div>
  //   );

  // TODO WOULD be cool if i pull this up so it doesnt rest each count change
  // TODO implement filter and sort
  // don't show empty categories
  // if (toShow?.length === 0) return null;
  // TODO lots of UI jank in terms of not matching widths when cards change when steps change
  //  also heingth of things are jank when go from having 4 cards to 1
  // jumpy janky ux
  return (
    <>
      <div className="width mx-auto mb-6 mt-20 min-h-screen w-full min-w-[100%] max-w-[100%] text-center xs:max-w-[100%] xs:p-2">
        <h2 className="mb-4 text-3xl font-medium text-white sm:mb-6 ">
          Past Entries
        </h2>
        {/* TODO I dont like how squished against the walls this is on smallest I5 sc */}
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
                  {/* <Settings2 className="h-4 w-4" /> */}
                  <span className={`  text-white`}>
                    <FaSearch />
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80   bg-slate-900 shadow-sm">
                <div className="grid gap-4 ">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none text-white">
                      Filter By Search
                    </h4>
                    <div className="mb-10  ">
                      {/* TODO make into larger search component */}

                      <SearchBar onSearch={getSearchQuery} />
                      {searchQuery && (
                        <button
                          className="btn-neutral btn bg-primary text-white"
                          disabled={!searchQuery}
                          onClick={() => setSearchQuery("")}
                        >
                          <span className="mr-4 inline-block">
                            Undo {'"'}
                            <span
                              className="inline-block max-w-[7ch] overflow-hidden text-ellipsis lowercase  
                            "
                            >
                              {searchQuery}
                            </span>
                            {'"'} ?
                          </span>
                          <FaTrash />
                        </button>
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
                  {/* <Settings2 className="h-4 w-4" /> */}
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
                      {/* So could instead jus thave prisma search OR like by name OR by mood includes that etc make it more flexible on BE */}
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
                          Reset mood filter
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
                  {/* <Settings2 className="h-4 w-4" /> */}
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
          {/* TODO flesh this logic out make look better  */}
        </div>
        {/* TODO fix this type mismatch caused by different setter function types ie diff data
        i think i coudl use useReducer to help heremove the setLogic to reducers and then just pass action types around
        */}

        {/* TODO add a way to show the search query and to clear it */}

        {!toShow?.length && (
          <div className="min-h-[38rem] min-w-[20rem]  xs:min-w-[30rem]"></div>
        )}
        {toShow?.map((entry: cBT_FormDataType, i) => (
          // <div
          //   key={entry.id}
          //   className="card sm:hover:bg-primary-focus mx-auto mb-4 min-h-[8rem] min-w-[20rem] max-w-[95%] flex-row bg-slate-700 pr-0  pl-6 text-white shadow max-[375px]:w-80  xs:min-w-[30rem] sm:mb-10"
          // >
          <div
            key={entry.id}
            className="card mx-auto mb-4 min-h-[8rem] min-w-[95%]  max-w-[95%] flex-row bg-slate-700 pr-0 pl-6 text-white  shadow sm:mb-10   sm:hover:bg-primary-focus "
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
              <p className="text-left text-sm">{formatDate(entry)}</p>
            </div>
            <div className="flex flex-row items-end justify-between gap-0 pb-2">
              <Link
                className="btn-ghost btn-sm btn mr-0 text-xl text-yellow-200"
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
                  <span className=" btn-ghost btn-sm btn mr-1 bg-transparent text-lg text-yellow-200">
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

//
// TODO have character limits on input so that doesnt get out of hand, and can show how many chars
// in file out of total

// TODO redo react select with something mroe accessible liek radix
// TODO break nav utilites into its won component  and its components into components
