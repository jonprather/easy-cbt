import EmojiSelector from "./EmojiSelector.tsx";

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
  // TODO finish pulling these out figure out why this is jank and sayign expression expected and shit
  return (
    <div className="form-control ">
      {/* TODO ok all the inputs are working it would be cool to refactor and add ts types some tests for edge cases etc
     then move on to reading into table then edit and delete etc
    */}
      {/* Child one for flex */}
      <div className="mb-4 mt-4 ">
        <label className="label block w-full pr-0 pl-0">
          <span className="label-text mb-2 block capitalize text-white">
            {/* These are slighly off ie name input and select mood slighlty deff padding on container */}{" "}
            Name This entry
          </span>
          <input
            value={data.name}
            // TODO
            onChange={handleChange}
            type="text"
            name="name"
            className="input-bordered input w-full max-w-xs bg-white text-black"
            // className="focus:shadow-outline block w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 pl-6 pr-6 leading-normal text-black focus:outline-none md:w-1/2"
          />
          {errors?.name && <div className="text-red-500">{errors.name}</div>}
        </label>
      </div>

      <div className="child-two">
        <label className="block">
          <span className="label-text mb-2 block text-white"> Name Mood:</span>

          <EmojiSelector
            moodLabel={data.moodLabel}
            moodName={data.moodName}
            setData={setData}
          />
          {errors?.nameMood && (
            <div className="text-red-500">{errors.nameMood}</div>
          )}
        </label>
        <label className="text-md mt-4 block font-medium sm:text-lg">
          <span className="label-text text-white">
            {" "}
            How intense is this feeling?
          </span>

          <input
            value={data.moodRating}
            // TODO
            onChange={handleRateMood}
            type="range"
            min="1"
            max="100"
            name="moodRating"
            className="range range-primary mt-2 block max-w-xs "
            // className="focus:shadow-outline block w-full rounded-lg border border-gray-300 bg-white py-2 leading-normal sm:w-1/2  md:w-1/3 "
          />
          {errors?.rateMood && (
            <div className="text-red-500">{errors.rateMood}</div>
          )}
        </label>
      </div>
    </div>
  );
};

export default NameAndRateMood;
