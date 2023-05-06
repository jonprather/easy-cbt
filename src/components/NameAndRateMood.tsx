import EmojiSelector from "./EmojiSelector";
import type { CBT_FormDataType } from "src/types/CBTFormTypes";
import type { InputField } from "./organisms/CBTAppTemplate";
import Modal from "./molecules/Modal";
import CharCountDisplay from "./atoms/CharacterCountDisplay";
const MAX_LENGTH = 500;

type Props = {
  currentStep: number;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    control: InputField["control"]
  ) => void;
  data: CBT_FormDataType;
  setData: React.Dispatch<React.SetStateAction<CBT_FormDataType>>;
};
const NameAndRateMood: React.FC<Props> = ({
  currentStep,
  handleChange,
  setData,
  data,
}) => {
  const handleMoodChange = (moodName: string, moodLabel: string) => {
    setData((prev) => {
      return {
        ...prev,
        moodLabel,
        moodName,
      };
    });
  };
  const handleMoodRating = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e, "RangeSlider");
  };

  if (currentStep !== 0) return null;
  return (
    <div className="form-control mb-10">
      {/* Child one for flex */}
      <div className="">
        <div className="flex items-end justify-between">
          <label className="label">
            <Modal
              id={"journal-title"}
              labelText={"Name the situation"}
              title="Name the situation that gave rise to the strong mood"
              content={
                "Naming the situation will help to see the connection between thoughts, moods, behaviors and situations. Also, Naming it someting memorable will allow you to easily refer to this entry later."
              }
            />
          </label>
        </div>
        <input
          data-testid="name"
          value={data?.name ?? ""}
          onChange={(e) => handleChange(e, "Text")}
          placeholder="Some Title"
          type="text"
          name="name"
          maxLength={MAX_LENGTH}
          className="swiper-no-swiping input-bordered input w-full bg-white text-black xs:max-w-xs"
        />
        <label className="label">
          <span className="label-text-alt">
            <CharCountDisplay
              currentCount={data?.name?.length || 0}
              charLimit={MAX_LENGTH}
            />
          </span>
        </label>

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
          onChange={handleMoodChange}
        />
        {/* {errors?.nameMood && (
          <div className="text-red-500">{errors.nameMood}</div>
        )} */}

        <div className="mt-4 flex items-end justify-between">
          <label className="label">
            <Modal
              id={"rateMood"}
              labelText={"Rate Your Mood Intensity"}
              title="Rate Your moods intensity"
              content={
                "Focus on how your body feels. Then try to feel how intense that feeling is and give it a number between 1-100."
              }
            />
          </label>
        </div>
        <input
          value={data.moodRating}
          data-testid="moodRating"
          onChange={handleMoodRating}
          type="range"
          min="1"
          max="100"
          name="moodRating"
          className="swiper-no-swiping range range-primary mt-2 block xs:max-w-xs "
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
