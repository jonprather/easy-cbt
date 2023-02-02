import EmojiSelector from "./EmojiSelector.tsx";
import { Tooltip } from "react-tooltip";
import { FaInfoCircle } from "react-icons/fa";
const NameAndRateMood = ({
  currentStep,
  errors,
  handleChange,
  setData,
  data,
}) => {
  const handleRateMood = (e) => {
    setData((prev) => {
      return {
        ...prev,
        moodRating: +e.target.value,
      };
    });
  };
  if (currentStep !== 0) return;
  return (
    <div className="form-control mt-4 ">
      {/* Child one for flex */}
      <div className="mb-10  ">
        <label className="label flex items-end justify-start">
          <span className="label-text capitalize text-white">
            CBT Journal Entry Title
          </span>
          <span
            id="toolTipTitle"
            className="text-md cursor ml-2 bg-inherit p-0"
          >
            <FaInfoCircle />
          </span>
        </label>
        <input
          value={data.name}
          // TODO
          onChange={handleChange}
          placeholder="Feeling moody today"
          type="text"
          name="name"
          className="input-bordered input w-full max-w-xs bg-white text-black"
        />
        {errors?.name && <div className="text-red-500">{errors.name}</div>}
      </div>

      <div className="child-two">
        <button type="button" className="label flex items-end justify-start">
          <span className="label-text  capitalize text-white">
            Select Your intense mood
          </span>
          <span id="toolTipMood" className="text-md ml-2  bg-inherit p-0">
            <FaInfoCircle />
          </span>
        </button>
        <EmojiSelector
          moodLabel={data.moodLabel}
          moodName={data.moodName}
          setData={setData}
        />
        {errors?.nameMood && (
          <div className="text-red-500">{errors.nameMood}</div>
        )}

        <label className="text-md mt-4 block  sm:text-lg">
          <button
            type="button"
            className="label flex max-w-xs items-end justify-start"
          >
            <span className="label-text  capitalize text-white">
              Rate the intensity of the feeling
            </span>
            <span id="toolTipRating" className="text-md ml-2  bg-inherit p-0">
              <FaInfoCircle />
            </span>
          </button>
        </label>
        <input
          value={data.moodRating}
          // TODO
          onChange={handleRateMood}
          type="range"
          min="1"
          max="100"
          name="moodRating"
          className="range range-primary mt-2 block max-w-xs "
        />
        <div className="flex w-full max-w-xs justify-between px-2 pt-1 text-xs">
          <span>Low</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>High</span>
        </div>
        {errors?.rateMood && (
          <div className="text-red-500">{errors.rateMood}</div>
        )}
      </div>

      {[
        { id: "toolTipTitle", content: "Name the entry" },
        { id: "toolTipMood", content: "Select mood name" },

        { id: "toolTipRating", content: "Feel your body." },
      ].map((toolTip) => {
        return (
          <Tooltip
            key={toolTip.id}
            anchorId={toolTip.id}
            content={toolTip.content}
            events={["click", "hover"]}
            className="bg-primary"
            variant="light"
          />
        );
      })}
    </div>
  );
};

export default NameAndRateMood;
