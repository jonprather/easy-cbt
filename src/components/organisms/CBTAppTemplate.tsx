import React, { useState, useEffect, useRef } from "react";

import { api } from "../../utils/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { toast } from "react-toastify";
import { debounce } from "lodash";

import type { ChangeEvent } from "react";

import type { CBT_FormDataType } from "../../types/CBTFormTypes";
import type { CBTData } from "../../types/CBTFormTypes";

import FormNavSteps from "../FormNavSteps";
import NameAndRateMood from "../NameAndRateMood";
import AutomaticThoughts from "../AutomaticThoughts";
import PreviousAndNextButtons from "../PreviousAndNextButtons";
import Rerate from "../Rerate";
import NewBalancedThought from "src/components/NewBalancedThought";
import Evidence from "src/components/Evidence";
import Chat from "../molecules/Chat";
import BottomNav from "../BottomNav";
import SaveStatusIndicator from "../atoms/AutoSaveStatus";
export const submitBtnDataAttribute = "submit-btn";
export const evidenceDataAttributes = {
  evidenceFor: "evidenceFor",
  evidenceAgainst: "evidenceAgainst",
};
export const columns: ["Name", "ANTS", "For", "against", "New", "Rerate"] = [
  "Name",
  "ANTS",
  "For",
  "against",
  "New",
  "Rerate",
];
// TODO
// could reuse the columns from nav steps here as well
interface CBTPROPS {
  initialData?: CBTData | undefined;
  title: string;
}

const CBTAppTemplate: React.FC<CBTPROPS> = ({ initialData, title }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { data: sessionData } = useSession();
  const [saveStatus, setSaveStatus] = useState<
    "unsaved" | "saving" | "saved" | "error"
  >(title?.toLowerCase()?.includes("update") ? "saved" : "unsaved");
  // TODO if its an update then should start as saved
  // if its a new creation than can start as unsaved
  //
  const router = useRouter();
  const { mutate: updatePost } = api.CBT.update.useMutation({
    onMutate: () => {
      setSaveStatus("saving");
    },

    onSuccess: async () => {
      await utils.CBT.invalidate();
      // TODO Only want to show the toast if its a final submit perhaps ie from the button...
      // toast.success("Succesfully updated journal!");
      setSaveStatus("saved");
    },
    onError: () => {
      setSaveStatus("error");
      // Handle error accordingly.
    },
  });
  // Had idea that i could move  detials of autosave into a hook that takes the data to save and state about hasChanged
  // and has a useEffect react to that change and then trigger the call .. can leave another call here in non hook for when the
  // default submit button is hit the useffect should close ove rthe data nd the hasChanged
  // the only prob is hasChanged ref is needing to be set in the hook and outside of it
  // TODO big issue all of these should first of all not be enabled if not logged in
  // second should return an error if an error instead of assuming success
  // weird that its sort of working ... ie getting correct response...
  const utils = api?.useContext();

  const { mutate: postMessage } = api.CBT.postMessage.useMutation({
    onSuccess: async (responseData) => {
      await utils.CBT.invalidate();
      setData((prev) => {
        return { ...prev, id: responseData.id };
      });
      setSaveStatus("saved");
      // toast.success("Succesfully created journal!");
    },
    onMutate: () => {
      setSaveStatus("saving");
    },

    onError: () => {
      setSaveStatus("error");
      // Handle error accordingly.
    },
  });

  const [errors, setErrors] = React.useState(null);
  const hasChanged = useRef(false);
  //  TODO make the modal text better
  const [data, setData] = useState<CBT_FormDataType>({
    name: "",
    moodName: "",
    moodLabel: "",
    moodRating: 1,
    automaticThoughts: [],
    evidenceFor: "",
    evidenceAgainst: "",
    newThought: "",
    rateBelief: 1,
    rerateEmotion: 1,
    id: "",
  });
  const setFormData = (data: CBTData | undefined) => {
    setData({
      name: data?.name || "",
      moodName: data?.moodName || "",
      moodLabel: data?.moodLabel || "",
      moodRating: data?.moodRating || 0,
      evidenceFor: data?.evidenceFor || "",
      evidenceAgainst: data?.evidenceAgainst || "",
      newThought: data?.newThought || "",
      rateBelief: data?.rateBelief || 0,
      rerateEmotion: data?.rerateEmotion || 0,
      id: data?.id || "",
      automaticThoughts: data?.automaticThoughts || [],
    });
  };

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    let altValue: undefined | number;
    if (
      name.toLowerCase().includes("rate") ||
      name.toLowerCase().includes("rating")
    ) {
      altValue = +value;
    }
    setData((prevState) => ({ ...prevState, [name]: altValue || value }));
    hasChanged.current = true;
    // sort of duplicate state here for unsavedStatus... and hasChanged
    setSaveStatus("unsaved");
  };

  // TODO fix the submit on enter its not pleasant UX when happens at AT ...
  // ALSO put max char counts on all the text feilds...
  const handleSubmit = () => {
    try {
      //   CBT_Schema.parse(formValues);

      if (!sessionData) {
        //TODO  So local data gets lost if they go to sign up which is annoying...
        // would be nice if somehow kept it?
        // maybe use jotai or something to keep app level state and with loc stor
        return toast.info("You must log in to save your journal!");
      }
      if (data?.id) {
        updatePost(data);
      } else {
        postMessage(data);
      }

      //   setErrors({});
      setData(() => {
        return {
          name: "",
          moodName: "",
          moodLabel: "",
          moodRating: 1,
          automaticThoughts: [],
          evidenceFor: "",
          evidenceAgainst: "",
          newThought: "",
          rateBelief: 1,
          rerateEmotion: 1,
          id: "",
        };
      });

      router.push("/").catch((error) => console.error(error));
    } catch (err) {
      // const validationError = String(fromZodError(err));
      // // the error now is readable by the user

      // const errorArray = validationError.split("; ");
      // const errorObject = {};
      // errorArray.forEach((error) => {
      //   const key = error.match(/\"(.*?)\"/)[1];
      //   const message = error;
      //   errorObject[key] = message;
      // });
      // setErrors(errorObject);
      console.log(JSON.stringify(err));
    }
  };

  // handle the auto save functionality id is also set in on Success of the post message
  useEffect(() => {
    const debouncedSave = debounce(() => {
      if (!sessionData) {
        return;
      }
      if (hasChanged.current) {
        console.log("DEBOUNCED SAVE data", data);
        if (data?.id) {
          updatePost(data);
        } else {
          postMessage(data);
        }

        hasChanged.current = false;
      }
    }, 5000);

    debouncedSave();

    return () => {
      debouncedSave.cancel();
    };
  }, [data, postMessage, updatePost]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if (currentStep !== columns.length - 1) {
        // event.preventDefault();
        // This is way too agressive I just want the form not to submit yet
        // i still want normal enter stuff to work
      }
    }
  };

  //   TODO zod controls for the boundaries or type guards

  return (
    <div className=" bg-gradient-to-br from-[#000709] to-[#022534]">
      <div className="mb-6 pt-8 text-center  sm:mb-16 sm:pt-16 lg:mb-20 lg:pt-24 ">
        <h1 className="text-md font-medium text-primary sm:text-xl">{title}</h1>
      </div>
      <FormNavSteps
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        columns={columns}
      />

      <div className="min-h-60 relative mx-auto flex flex-col justify-between p-0 pb-6  xs:p-4 sm:bg-slate-900 sm:p-6  sm:pt-6 md:max-w-5xl md:rounded-b md:rounded-tl md:shadow-lg ">
        <SaveStatusIndicator status={saveStatus} />
        {/*  TODO figure out exactly how this fits into UI not sure margin wise as it is or position */}
        <div
          onKeyDown={handleKeyDown}
          className="min-h-70 mx-auto flex w-full flex-col justify-between rounded pl-3 pr-3 shadow-lg xs:p-4 sm:mt-4   sm:max-w-3xl sm:bg-slate-800 md:mt-10"
        >
          <div className=" mt-3  ">
            <NameAndRateMood
              currentStep={currentStep}
              setData={setData}
              handleChange={handleChange}
              data={data}
            />
            <AutomaticThoughts
              setData={setData}
              handleChange={handleChange}
              data={data}
              currentStep={currentStep}
            />

            <Evidence
              data={data}
              handleChange={handleChange}
              evidence={data.evidenceFor ?? ""}
              currentStep={currentStep}
              targetStep={2}
              errors={errors}
              title="Evidence Supporting the Thought"
              evidenceName={evidenceDataAttributes.evidenceFor}
            />
            <Evidence
              data={data}
              evidence={data.evidenceAgainst ?? ""}
              handleChange={handleChange}
              currentStep={currentStep}
              targetStep={3}
              errors={errors}
              title="Evidence against the thought"
              evidenceName={evidenceDataAttributes.evidenceAgainst}
            />

            <NewBalancedThought
              data={data}
              handleChange={handleChange}
              currentStep={currentStep}
              errors={errors}
            />

            <Rerate
              currentStep={currentStep}
              data={data}
              handleChange={handleChange}
              columns={columns}
            />
            {/* TODO ok autosave doesnt work when setData is used...  */}
          </div>
          {currentStep === columns.length - 1 && (
            <button
              data-testid={submitBtnDataAttribute}
              onClick={handleSubmit}
              disabled={currentStep !== columns.length - 1}
              className="btn-accent btn mx-auto mt-8 mb-4  w-full max-w-sm  animate-none md:max-w-xs  "
            >
              {data.id ? "Update Entry" : "Add Entry"}
            </button>
          )}
        </div>

        <div className="mb-16  ">
          <PreviousAndNextButtons
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            columns={columns}
          />
        </div>
      </div>
      <BottomNav />
      <Chat currentStep={currentStep} data={data} />
    </div>
  );
};
export default CBTAppTemplate;

// TODO so what if autosave didnt use validation but final submit does... that way can have the ease of use
// and in the final get the final form correct

// ok so userQuery becomes part of the chatHistory right?
// i can make it like chatHistory .push ({userQuery:'hi', chatBot:'hello dude'}, )
// or could do it just strings in an array and assume that the back and forth indicates the different
// also prob should disable text input while the response is loading
// Can do a push to home once you complete a journal
// If its a create call can also do a congrats modal or popup
// would be cool if there were a way to track streaks like a calendar...
