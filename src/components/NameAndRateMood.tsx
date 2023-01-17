import EmojiSelector from "./EmojiSelector.tsx";

const NameAndRateMood = ({ currentStep, errors, handleChange, data }) => {
  if (currentStep !== 0) return;
  // TODO finish pulling these out figure out why this is jank and sayign expression expected and shit
  return (
    <>
      <label className="mt-4 block">
        Name Mood:
        {console.log("HANDLE CHANGE RIGHT B$", handleChange)}
        <EmojiSelector nameMood={data.nameMood} onChange={handleChange} />
        {errors?.nameMood && (
          <div className="text-red-500">{errors.nameMood}</div>
        )}
      </label>
      <label className="mt-4 block">
        Rate Mood:
        <input
          value={data.rateMood}
          onChange={handleChange}
          type="number"
          min="1"
          max="100"
          name="rateMood"
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
