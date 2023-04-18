// components/EmojiFilter.tsx

import React from "react";
import { FaFilter } from "react-icons/fa";
import { Popover, PopoverContent, PopoverTrigger } from "../molecules/Popover";
import EmojiSelector from "../EmojiSelector";

interface EmojiFilterProps {
  emojiData: { moodName: string; moodLabel: string };
  handleMoodChange: (moodName: string, moodLabel: string) => void;
  setEmojiData: (data: { moodLabel: string; moodName: string }) => void;
}

const EmojiFilter: React.FC<EmojiFilterProps> = ({
  emojiData,
  handleMoodChange,
  setEmojiData,
}) => {
  return (
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
              Filter By Mood{" "}
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
                  onClick={() => setEmojiData({ moodLabel: "", moodName: "" })}
                >
                  Reset Filter
                </button>
              </p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EmojiFilter;
