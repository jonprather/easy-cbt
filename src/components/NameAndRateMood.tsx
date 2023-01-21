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
    <>
      <label className="text-md mt-4 block font-medium sm:text-lg">
        🏷️ Name This entry
        <input
          value={data.name}
          // TODO
          onChange={handleChange}
          type="text"
          name="name"
          className="focus:shadow-outline block appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 pl-6 pr-6 leading-normal focus:outline-none"
        />
        {errors?.name && <div className="text-red-500">{errors.name}</div>}
      </label>
      <label className="text-md mt-4 block font-medium sm:text-lg">
        🏷️ Name Mood:
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
        📏 Rate Mood:
        <input
          value={data.moodRating}
          // TODO
          onChange={handleRateMood}
          type="number"
          min="1"
          max="100"
          name="moodRating"
          className="focus:shadow-outline block appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 pl-6 pr-6 leading-normal focus:outline-none"
        />
        {errors?.rateMood && (
          <div className="text-red-500">{errors.rateMood}</div>
        )}
      </label>
    </>
  );
};

export default NameAndRateMood;
