import React, { useState } from "react";
import { api } from "../utils/api";

import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

import type { TSortOptionValues } from "./molecules/SortingComponent";
import { useIsFetching } from "@tanstack/react-query";
import Pagination from "./molecules/Pagination";
import EntryCardList from "./organisms/EntryList";

import FilterNavUtilities from "./organisms/FilterNavUtilities";
import Alert from "./molecules/Alert";
const Table = () => {
  const utils = api.useContext();
  const { data: sessionData } = useSession();
  const [page, setPage] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortingOption, setSortingOption] = useState<TSortOptionValues>({
    direction: "desc",
    property: "updatedAt",
  });
  const [emojiData, setEmojiData] = useState({ moodName: "", moodLabel: "" });
  const isFetching = useIsFetching();

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

  const pageTotal = data?.pages[0]?.pageCount;
  const totalCount = data?.pages[0]?.totalCount;

  React.useEffect(() => {
    if (!pageTotal) return;
    if (page > pageTotal) {
      setPage((prev) => {
        return prev - 1;
      });
    }
  }, [pageTotal, page]);

  const getSearchQuery = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };

  const handleFetchNextPage = () => {
    void fetchNextPage();
    setPage((prev) => prev + 1);
  };

  const handleFetchPreviousPage = () => {
    setPage((prev) => prev - 1);
  };

  const handleMoodChange = (moodName: string, moodLabel: string) => {
    setEmojiData(() => {
      return {
        moodLabel,
        moodName,
      };
    });
  };

  const emitSortingData = (option: TSortOptionValues) => {
    setSortingOption(option);
  };
  const nextCursor = data?.pages[page]?.nextCursor;
  const toShow = data?.pages[page]?.items ?? null;

  function getInfoMessage(resultsCount: number): string {
    if (resultsCount === 0) {
      return "Sorry, there are no results.";
    } else if (resultsCount === 1) {
      return "You have found one result.";
    } else {
      return `You found ${resultsCount} results.`;
    }
  }

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
        <div className="nav-utitlies mb-10 flex w-full  items-center  justify-between rounded-xl pl-1 pr-1 six:pl-2 six:pr-2  xs:max-w-full   xs:bg-slate-800 xs:p-2">
          <Pagination
            onPrevPage={handleFetchPreviousPage}
            onNextPage={handleFetchNextPage}
            currentPage={page}
            totalPages={pageTotal ?? 0}
            nextCursor={nextCursor}
          />

          <FilterNavUtilities
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            getSearchQuery={getSearchQuery}
            emojiData={emojiData}
            handleMoodChange={handleMoodChange}
            setEmojiData={setEmojiData}
            sortingOption={sortingOption}
            emitSortingData={emitSortingData}
          />
        </div>

        {(searchQuery || emojiData.moodName) && !isFetching ? (
          <Alert message={getInfoMessage(totalCount ?? 0)} type="info" />
        ) : null}
        <EntryCardList
          deletePost={deletePost}
          toShow={toShow}
          isFetching={!!isFetching}
          errorMessage={error?.message || ""}
        />
      </div>
    </>
  );
};
export default Table;
