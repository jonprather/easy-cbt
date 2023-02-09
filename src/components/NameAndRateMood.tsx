import EmojiSelector from "./EmojiSelector";
import type { CBT_FormDataType } from "src/types/CBTFormTypes";

import Modal from "./molecules/Modal";
type Props = {
  currentStep: number;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  data: CBT_FormDataType;
  setData: React.Dispatch<React.SetStateAction<CBT_FormDataType>>;
};
const NameAndRateMood: React.FC<Props> = ({
  currentStep,
  handleChange,
  setData,
  data,
}) => {
  const handleRateMood = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev: CBT_FormDataType) => {
      return {
        ...prev,
        moodRating: +e.target.value,
      };
    });
  };
  if (currentStep !== 0) return null;
  return (
    <div className="form-control mt-4 ">
      {/* Child one for flex */}
      <div className="mb-8  ">
        <div className="flex items-end justify-between">
          <label className="label">
            <Modal
              id={"journal-title"}
              labelText={"CBT Journal Title"}
              title="Choose a title for your jounal entry"
              content={
                "Name it whatever you want. Naming it someting memorable will allow you to easily refer to this entry later."
              }
            />
          </label>
        </div>
        <input
          value={data?.name ?? ""}
          // TODO
          onChange={handleChange}
          placeholder="Some Title"
          type="text"
          name="name"
          className="input-bordered input w-full bg-white text-black xs:max-w-xs"
        />
        {/* {errors?.name && <div className="text-red-500">{errors.name}</div>} */}
      </div>

      <div className="child-two">
        <div className="flex items-end justify-between">
          <label className="label">
            <Modal
              id={"selectMood"}
              labelText={"Select Your Mood"}
              title="Choose the Strong Mood"
              content={
                "Usually you will choose the strongest mood that you currently feel. You can also work on any other mood you are feeling."
              }
            />
          </label>
        </div>
        <EmojiSelector
          moodLabel={data?.moodLabel ?? ""}
          moodName={data.moodName ?? ""}
          setData={setData}
        />
        {/* {errors?.nameMood && (
          <div className="text-red-500">{errors.nameMood}</div>
        )} */}

        <div className="mt-4 flex items-end justify-between">
          <label className="label">
            <Modal
              id={"rateMood"}
              labelText={"Rate your mood Intensity"}
              title="Rate Your moods intensity"
              content={
                "Focus on how your body feels. Then try to feel how intense that feeling is and give it a number between 1-100."
              }
            />
          </label>
        </div>
        <input
          value={data.moodRating}
          // TODO
          onChange={handleRateMood}
          type="range"
          min="1"
          max="100"
          name="moodRating"
          className="range range-primary mt-2 block xs:max-w-xs "
        />
        <div className="flex w-full justify-between px-2 pt-1 text-xs xs:max-w-xs">
          <span>Low</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>High</span>
        </div>
        {/* {errors?.rateMood && (
          <div className="text-red-500">{errors.rateMood}</div>
        )} */}
      </div>
    </div>
  );
};

export default NameAndRateMood;
