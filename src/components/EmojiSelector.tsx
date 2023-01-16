import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "angry", label: "😠 Angry" },
  { value: "anxious", label: "😰 Anxious" },
  { value: "content", label: "😊 Content" },
  { value: "depressed", label: "😔 Depressed" },
  { value: "excited", label: "😃 Excited" },
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

const MoodPicker = ({ onSelect }) => {
  const [selected, setSelected] = useState(null);
  return (
    <Select
      options={options}
      value={selected}
      isMulti
      onChange={(option) => {
        setSelected(option);
        onSelect(option.value);
      }}
      components={{ DropdownIndicator: () => null }}
    />
  );
};

const EmotionTable = () => {
  const [mood, setMood] = useState(null);
  return (
    <div>
      <MoodPicker onSelect={setMood} />
    </div>
  );
};

export default EmotionTable;
