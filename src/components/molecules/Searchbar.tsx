import React, { useState } from "react";
import CharCountDisplay from "../atoms/CharacterCountDisplay";
interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}
const MAX_LENGTH = 40;
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };
  const handleSubmit = () => {
    onSearch(searchTerm);
    setSearchTerm("");
  };

  return (
    <div className="form-control mb-4 ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="input-group input-bordered rounded border-2 border-slate-500 text-white"
      >
        <input
          type="text"
          maxLength={MAX_LENGTH}
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search…"
          className="input w-full"
        />

        <button className=" btn-square btn bg-transparent" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
      <label className="label">
        <span className="label-text-alt">
          <CharCountDisplay
            charLimit={MAX_LENGTH}
            currentCount={Number(searchTerm.length ?? 0)}
          />
        </span>
      </label>
    </div>
  );
};

export default SearchBar;
