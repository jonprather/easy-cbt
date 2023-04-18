// components/SortFilter.tsx

import React from "react";
import {
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSortNumericDown,
  FaSortNumericUp,
} from "react-icons/fa";
import { Popover, PopoverContent, PopoverTrigger } from "../molecules/Popover";
import SortingComponent from "../molecules/SortingComponent";
import type { TSortOptionValues } from "../molecules/SortingComponent";

interface SortFilterProps {
  sortingOption: TSortOptionValues;
  emitSortingData: (option: TSortOptionValues) => void;
}

const EntriesSort: React.FC<SortFilterProps> = ({
  sortingOption,
  emitSortingData,
}) => {
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

  return (
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
  );
};

export default EntriesSort;
