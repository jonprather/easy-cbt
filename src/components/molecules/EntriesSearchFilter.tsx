// components/SearchFilter.tsx

import React from "react";
import { FaSearch, FaWindowClose } from "react-icons/fa";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import SearchBar from "./Searchbar";

interface SearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  getSearchQuery: (searchQuery: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchQuery,
  setSearchQuery,
  getSearchQuery,
}) => {
  return (
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
            <div className="">
              <SearchBar onSearch={getSearchQuery} />
              {searchQuery && (
                <>
                  <p className="mb-2">Searched:</p>

                  <button
                    onClick={() => setSearchQuery("")}
                    className="rounded-box relative w-full bg-slate-700 p-4 text-left text-white shadow-lg"
                  >
                    <div className="">
                      <span
                        className=" inline-block max-w-[22ch]
                          overflow-hidden text-ellipsis"
                      >
                        {searchQuery}
                      </span>
                      <div className="absolute top-3 right-4 inline-block  text-white">
                        <FaWindowClose />
                      </div>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SearchFilter;
