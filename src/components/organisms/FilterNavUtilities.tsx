// components/FilterComponent.tsx

import React from "react";
import MoodFilter from "../molecules/EntriesMoodFilter";
import SearchFilter from "../molecules/EntriesSearchFilter";
import SortFilter from "../molecules/EntriesSort";
import type { TSortOptionValues } from "../molecules/SortingComponent";

interface FilterComponentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  getSearchQuery: (searchQuery: string) => void;
  emojiData: { moodName: string; moodLabel: string };
  handleMoodChange: (moodName: string, moodLabel: string) => void;
  setEmojiData: (data: { moodLabel: string; moodName: string }) => void;
  sortingOption: TSortOptionValues;
  emitSortingData: (option: TSortOptionValues) => void;
}

const FilterNavUtilities: React.FC<FilterComponentProps> = ({
  searchQuery,
  setSearchQuery,
  getSearchQuery,
  emojiData,
  handleMoodChange,
  setEmojiData,
  sortingOption,
  emitSortingData,
}) => {
  return (
    <div className="">
      <SearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        getSearchQuery={getSearchQuery}
      />
      <MoodFilter
        emojiData={emojiData}
        handleMoodChange={handleMoodChange}
        setEmojiData={setEmojiData}
      />
      <SortFilter
        sortingOption={sortingOption}
        emitSortingData={emitSortingData}
      />
    </div>
  );
};

export default FilterNavUtilities;
