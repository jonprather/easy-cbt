import React, { useState, useEffect } from "react";

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

interface CBTPROPS {
  initialData?: CBTData | undefined;
  title: string;
  error?: string;
}
const initializeSaveStatus = (isError: boolean, title: string) => {
  if (isError) return "error";
  return title?.toLowerCase()?.includes("update") ? "saved" : "initial";
};
export type TSaveStatus = "initial" | "unsaved" | "saving" | "saved" | "error";
const CBTAppTemplate: React.FC<CBTPROPS> = ({ initialData, title, error }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { data: sessionData } = useSession();
  const [saveStatus, setSaveStatus] = useState<TSaveStatus>(() =>
    initializeSaveStatus(!!error, title)
  );

  const router = useRouter();
  const { mutate: updatePost } = api.CBT.update.useMutation({
    onMutate: () => {
      setSaveStatus("saving");
    },

    onSuccess: async () => {
      await utils.CBT.invalidate();
      setSaveStatus("saved");
    },
    onError: () => {
      setSaveStatus("error");
      toast.error("Error Saving Journal");

      // Handle error accordingly.
    },
  });

  useEffect(() => {
    if (!!error) {
      setSaveStatus("error");
    }
  }, [error]);

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
      toast.error("Error Saving Journal");
    },
  });
  const initializeDataObj = (data?: CBTData | undefined) => {
    return {
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
    };
  };

  const [data, setData] = useState<CBT_FormDataType>(
    initializeDataObj(initialData)
  );

  useEffect(() => {
    const setFormData = (data: CBTData | undefined) => {
      const initialDataObj = initializeDataObj(data);
      setData(initialDataObj);
    };
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
    setSaveStatus("unsaved");
  };

  const handleSubmit = () => {
    try {
      //   CBT_Schema.parse(formValues);
      if (!sessionData) {
        return toast.info("You must log in to save your journal!");
      }
      if (data?.id) {
        updatePost(data);
      } else {
        postMessage(data);
      }
      const dataObj = initializeDataObj();
      setData(() => {
        return dataObj;
      });

      router.push("/").catch((error) => console.error(error));
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  };

  // handle the auto save functionality id is also set in on Success of the post message
  useEffect(() => {
    const debouncedSave = debounce(() => {
      if (!sessionData) {
        return;
      }
      if (saveStatus === "unsaved") {
        if (data?.id) {
          updatePost(data);
        } else {
          postMessage(data);
        }
      }
    }, 5000);

    debouncedSave();

    return () => {
      debouncedSave.cancel();
    };
  }, [data, postMessage, updatePost, sessionData, saveStatus]);

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
        <div className="min-h-70 mx-auto flex w-full flex-col justify-between rounded pl-3 pr-3 shadow-lg xs:p-4 sm:mt-4   sm:max-w-3xl sm:bg-slate-800 md:mt-10">
          <div className=" mt-3  ">
            <NameAndRateMood
              currentStep={currentStep}
              setData={setData}
              handleChange={handleChange}
              data={data}
            />
            <AutomaticThoughts
              setData={setData}
              data={data}
              currentStep={currentStep}
              setSaveStatus={setSaveStatus}
            />

            <Evidence
              data={data}
              handleChange={handleChange}
              evidence={data.evidenceFor ?? ""}
              currentStep={currentStep}
              targetStep={2}
              title="Evidence Supporting the Thought"
              evidenceName={evidenceDataAttributes.evidenceFor}
            />
            <Evidence
              data={data}
              evidence={data.evidenceAgainst ?? ""}
              handleChange={handleChange}
              currentStep={currentStep}
              targetStep={3}
              title="Evidence against the thought"
              evidenceName={evidenceDataAttributes.evidenceAgainst}
            />

            <NewBalancedThought
              data={data}
              handleChange={handleChange}
              currentStep={currentStep}
            />

            <Rerate
              currentStep={currentStep}
              data={data}
              handleChange={handleChange}
              columns={columns}
            />
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
