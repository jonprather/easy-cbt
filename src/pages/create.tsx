import React, { useState } from "react";
import { ChangeEvent } from "react";

import FormNavSteps from "../components/FormNavSteps.tsx";
import Table from "../components/Table.tsx";
import * as z from "zod";
import { fromZodError } from "zod-validation-error";
import type { CBT_FormDataType, CBT_FormSchema } from "../types/CBTFormTypes";
import NameAndRateMood from "../components/NameAndRateMood.tsx";
import AutomaticThoughts from "../components/AutomaticThoughts.tsx";
import PreviousAndNextButtons from "../components/PreviousAndNextButtons.tsx";
import Rerate from "../components/Rerate.tsx";
import { api } from "../utils/api";
import { useMutation, useQueryClient } from "react-query";
import Layout from "../components/Layout";
import Collapse from "src/components/Collapse";
import NewBalancedThought from "src/components/NewBalancedThought";
import Evidence from "src/components/Evidence";
import CBTAppTemplate from "src/components/organisms/CBTAppTemplate";
// import { cBT_FormDataType } from "@prisma/client";
// TODO look up api new syntax
// import {trpc} from utils

// Can make a reusable component for evi for against and new
// its all very sim or can reuse teh components i uesd for automaticTHoughts
// that might work better to make a list that way
// Could add subtitles make it objects

// type CBT_FormDataType = {
//   nameMood?: {
//       label?: string | undefined;
//       value?: string | undefined;
//   } | undefined;
//   rateMood?: number | undefined;
//   evidenceFor?: string | undefined;
//   evidenceAgainst?: string | undefined;

//   name: string;
//   newThought?: string | undefined;
//   rateBelief?: number | undefined;
//   rerateEmotion?: number | undefined;
//   automaticThoughts: ({
//       thought?: string | undefined;
//       isHot?: boolean | undefined;
//   } | undefined)[];
// }

const columns = ["Name", "ANTS", "For", "against", "New", "Rerate"];
// TODO fix this type to be accurate then can use it to know prisma types
// could reuse the columns from nav steps here as well
function JournalTable() {
  const [currentStep, setCurrentStep] = useState(0);
  // const { mutate: postMessage } = api.CBT.postMessage.useMutation();
  const getAllPosts = api.CBT.getAll.useQuery();
  const { mutate: updatePost } = api.CBT.update.useMutation();
  const utils = api.useContext();
  // const queryClient = useQueryClient();

  const { mutate: postMessage } = api.CBT.postMessage.useMutation();

  const [errors, setErrors] = React.useState(null);
  // TODO now that types are diff update ares that use old types ie setting nameMood obj
  // also use setData pass that down rather onChange handle change or something...

  const [data, setData] = React.useState<CBT_FormDataType>({
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
  });
  // For testing
  React.useEffect(() => {
    // Why is this calling so much i mean its calling any time somehting changes that seems bad?
    //well it does log again but the mutations arent happening at same rate
    console.log(getAllPosts.data);
  }, [getAllPosts]);

  // React.useEffect(() => {
  //   const data = {
  //     name: "TESTS1",
  //     moodName: "anxious",
  //     moodLabel: "anxious emo",
  //     moodRating: 44,
  //     automaticThoughts: [{ thought: "This sucks", isHot: true }],
  //     evidenceFor: "This took forever, i have a headache",
  //     evidenceAgainst: "Its working maybe",
  //     newThought: "idgaf",
  //     rateBelief: 11,
  //     rerateEmotion: 12,
  //   };
  //   mutate(data);
  //   console.log("data", data);
  // }, [data, mutate]);
  // TODO  Do similar for mood and rating for the given mood maybe can not have multi
  // otherwise have to use similar logic
  const getHotThoughtsText = () => {
    let hotThoughts = data?.automaticThoughts
      ?.filter((thoughts) => thoughts.isHot)
      ?.map((thoughts) => thoughts.thought + "  🔥 ")
      ?.join(" - ");
    return hotThoughts;
  };
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
  //   TODO not sure how i want this designed is mutli moods really benificial?
  // Imean they can make a new table or i guess it could be nice to have that ability...
  const getMoodText = () => {
    let hotThoughts = data?.automaticThoughts
      ?.filter((thoughts) => thoughts.isHot)
      ?.map((thoughts) => thoughts.thought)
      ?.join(";");
    return hotThoughts;
  };

  // Ok the onChange complains that i have a index here
  // It is only used for when the input is clciked to edit the existing hot thought
  // The textArea new line approach may be easier
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // if (event.target.name === "automaticThoughts") {
    //   const newAutoThoughts = [...data.automaticThoughts];
    //   const index = data.automaticThoughts.findIndex(
    //     (thought) => thought?.thought === value
    //   );
    //   if (newAutoThoughts && newAutoThoughts[index]) {
    //     newAutoThoughts[index].thought = event.target.value;
    //   }
    //   setData({ ...data, automaticThoughts: newThoughts });
    // }
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  // TODO fix the submit on enter its not pleasant UX when happens at AT ...
  // ALSO put max char counts on all the text feilds...
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log("FORM SUBMITTED");
    // also need to reset the ref on automatic thoughts .... when submit
    try {
      //   CBT_Schema.parse(formValues);
      // So if going to reuse the form could do things differently ie
      //could use upsert in prisma pro 1 interface con id requirement wouldnt work for new things
      // could base it on if id is not a empty string if so update if not create new
      if (data.id) {
        console.log("updated post", data);
        // TODO next make a btn to load a post into the form data obj
        // so that on next submit it will be an update
        updatePost(data);
      } else {
        // Can also check if data has changed here like if its the same as default can prompt user
        postMessage(data);
      }
      // so parse mighght be too strick can use it as a warning anyway
      //   ie set some state and warn user but it doesnt matter as ill allow it..
      //   setData([...data, formValues]);
      // const test = api.CBT.postMessage(data);
      // console.log("FORM SUBMITTED", test);

      setErrors({});
      setData((prevData) => {
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
        };
      });
    } catch (err: Error) {
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
  const handleKeyDown = (event) => {
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
    <Layout>
      <div className="mb-6 p-4 text-center  sm:mt-10 md:p-20">
        <h1 className="mb-4 text-4xl font-medium text-primary">
          EasyCBT Diary
        </h1>
        <p className="text-xl font-medium text-white ">
          {/*  */}
          Track your thoughts, moods and progress with CBT
        </p>
      </div>

      <CBTAppTemplate />
    </Layout>
  );
}
export default JournalTable;

// TODO
// dont forget savablitilty
// auto saves
// also save progress

// multiple autothoughts mutil moods selectable..
{
  /* TODO could make this be a list where you can select the hot thought to work on...
        // But how would i handle the lis extract data and have it be part of table... and be an input
         */
}
{
  /* Also make it scale up onBlur or something or do the top bar then full ani so dont have to scroll
   */
}
{
  /* could also have overfolow and or let user size it */
}
{
  /* Also in the past tables list view could have pagination or cutt off then show more would be nice
          //FOR THAT  outputted table maybe a mre advaced lib would be sueful...
          */
}

// Could leave click to fill for examples....
// could have random examples in array and it can gen them to learn from
// can have a learning zone practice zone and normal zone (or modes...)

// For the form validation can have it be lax - like it can prompt you hey this isnt finished are you sure you want to
// submit
// but really could save it behind scenes anyway so being uncomplete is fine
// can allow incremental usage and review
// would be cool to be able to load table data back into it to review update it should be easy
// but again will need to handle state

// TODO could add two btns one for genereal info help and another for the advanced help
// TODO not storing anystate at this time when move tabs

// TODO reference things from earlie ras needed eg like new thought when doing rate belief etc
// alos consider diff groupings... like could for and against be on same page?
// what about new thourght and rating it and new mood could be on final?

//TODO could have a button to toglle the validation things as a helper ie trigger them so that they help tell you
// but i do it in a way that doesnt block submitting - this wont work with optionality ... so id have to adjust that

// also have buttons which provide helpful info they can just use the current step...

// TODO next- lets get the basic flow going add the relevant steps carryover stuff test it more
// when solidifies then fix up UI UX
//then BE connection
// in mean time can also fix up TS issues

// Need a way to distinguish visually between carryover items that are read only and ones to add stuff

// TODO using a div will solve the form submit on enter prob
// TODO can also use enter on the ANT box

// IDea auto push these TODO list into the cloud link with other providers
// Can make the reference material show hidable  to clean up ui make less cluttered etc
// TODO  COuld add swipe functionality to the inputs
// make it more app like
//  could add help data as an object with keys for each type of input...
