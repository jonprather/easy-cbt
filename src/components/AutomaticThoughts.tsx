import React from "react";
const AutomaticThoughts = ({
  data,
  currentStep,
  errors,

  handleChange,
  setData,
}) => {
  const handleHotThoughtClick = (index) => {
    setData((prev) => {
      const newThoughts = [...prev.automaticThoughts];
      newThoughts[index] = {
        ...newThoughts[index],
        isHot: !newThoughts[index].isHot,
      };
      return {
        ...prev,
        automaticThoughts: newThoughts,
      };
    });
  };

  const textInput = React.createRef();

  if (currentStep !== 1) return;
  return (
    <>
      <div className={"bg-gray-100 sm:h-80"}>
        <label className="mt-4 block ">
          Automatic Thoughts:
          <input
            type="text"
            name="automaticThoughts"
            ref={textInput}
            className="focus:shadow-outline block    w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 leading-normal focus:outline-none"
          />
        </label>
        <div className="flex justify-start ">
          <button
            type="button"
            onClick={(e) => {
              let newThought = textInput.current.value;
              setData((prev) => {
                return {
                  ...prev,
                  automaticThoughts: [
                    ...prev.automaticThoughts,
                    { thought: newThought, isHot: false },
                  ],
                };
              });
              textInput.current.value = "";
            }}
            className="mt-6 mb-3 rounded-lg border border-gray-400 bg-blue-600 py-2 px-4 font-semibold text-white shadow-md hover:bg-blue-700"
          >
            Add
          </button>
          <h3 className="semibold my-auto p-2 text-lg font-medium">
            Thought List
          </h3>
        </div>
        <div className="h-36 overflow-y-scroll bg-white p-2 md:h-52 ">
          <ul>
            {data.automaticThoughts.map((thoughts, index) => (
              <li
                key={index}
                onClick={() => handleHotThoughtClick(index)}
                className={` cursor-pointer text-lg ${
                  thoughts.isHot === true ? "text-red-500" : "text-gray-700"
                }`}
              >
                {/* <input
                  name="automaticThoughts"
                  value={thoughts.thought}
                  onChange={(e) => handleChange(e, index)}
                /> */}
                {thoughts.thought} {`${thoughts.isHot ? "🔥" : "😐"}`}
              </li>
            ))}
          </ul>
        </div>

        {errors?.automaticThoughts && (
          <div className="text-red-500">{errors.automaticThoughts}</div>
        )}
      </div>
    </>
  );
};

export default AutomaticThoughts;
