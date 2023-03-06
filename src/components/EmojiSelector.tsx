import React from "react";
import Select from "react-select";
import type { CBT_FormDataType } from "src/types/CBTFormTypes";
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

type AutomaticThoughtsProps = {
  moodName: string;
  moodLabel: string;
  setData: React.Dispatch<React.SetStateAction<CBT_FormDataType>>;
};

const EmojiSelector: React.FC<AutomaticThoughtsProps> = ({
  moodName,
  moodLabel,
  setData,
}) => {
  return (
    <div>
      <Select
        // TODO not sure how to test this... as cypress cant find it
        data-testid="emojiSelector"
        className={" w-full rounded-full xs:max-w-xs "}
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
              moodLabel: opt?.label ?? "",
              moodName: opt?.value ?? "",
            };
          })
        }
      />
    </div>
  );
};

export default EmojiSelector;
