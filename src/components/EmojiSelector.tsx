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

const MoodPicker = ({ nameMood, onChange }) => {
  return (
    <Select
      options={options}
      value={nameMood}
      //   isMulti
      onChange={(selectedOption) =>
        onChange({ target: { name: "nameMood", value: selectedOption } })
      }
      components={{ DropdownIndicator: () => null }}
    />
  );
};
// TODO NOTE if use isMulti flag for multi emo at once then selectedOption becomes an array of values
// value
// :
// Array(1)
// 0
// :
// {value: 'angry', label: '😠 Angry'}

const EmotionTable = ({ nameMood, onChange }) => {
  const [mood, setMood] = useState(null);
  return (
    <div>
      <MoodPicker onChange={onChange} nameMood={nameMood} />
    </div>
  );
};

export default EmotionTable;
