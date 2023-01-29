import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "angry", label: "😠 Angry" },
  { value: "anxious", label: "😰 Anxious" },
  { value: "content", label: "😊 Content" },
  { value: "depressed", label: "😔 Depressed" },
  { value: "excited", label: "😃 Excited" },
  { value: "frustrated", label: "😤 Frustrated" },
  { value: "grateful", label: "😌 Grateful" },
  { value: "happy", label: "😃 Happy" },
  { value: "inspired", label: "😃 Inspired" },
  { value: "neutral", label: "😐 Neutral" },
  { value: "overwhelmed", label: "😵 Overwhelmed" },
  { value: "peaceful", label: "😌 Peaceful" },
  { value: "sad", label: "😔 Sad" },
  { value: "stressed", label: "😰 Stressed" },
  { value: "tired", label: "😴 Tired" },
  { value: "worried", label: "😟 Worried" },
];

// TODO NOTE if use isMulti flag for multi emo at once then selectedOption becomes an array of values
// value
// :
// Array(1)
// 0
// :
// {value: 'angry', label: '😠 Angry'}

const EmojiSelector = ({ moodName, moodLabel, setData }) => {
  return (
    <div>
      <Select
        className={" w-full max-w-xs rounded-full "}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            background: state.isFocused ? "grey" : "bg-primary",
            borderRadius: "6px",
            padding: "4px",
          }),
        }}
        options={options}
        value={{ label: moodLabel, value: moodName }}
        // isMulti
        onChange={(opt) =>
          setData((prev) => {
            return {
              ...prev,
              moodLabel: opt.label,
              moodName: opt.value,
            };
          })
        }
        // components={{ DropdownIndicator: () => null }}
      />
    </div>
  );
};

export default EmojiSelector;
