interface Props {
  description: string | JSX.Element;
  title: string;
  icon?: JSX.Element;
  labelText: string;
}
import { ANTDataAtributes } from "./AutomaticThoughts";
import { FaInfoCircle } from "react-icons/fa";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
// import './styles.css';
const Icon = (
  <span className="text-md  bg-transparent   p-0">
    <FaInfoCircle />
  </span>
);
const DialogDemo: React.FC<Props> = ({
  description,
  title,
  icon = Icon,
  labelText,
}) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="flex items-center justify-end text-lg hover:cursor-pointer">
        {!!{ labelText } && (
          <span className="label-text  mr-2 capitalize text-white">
            {labelText}
          </span>
        )}

        {icon}
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      {/* <Dialog.Overlay className="DialogOverlay absolute" /> */}
      {/* So i think on Desktop i can use the div and for things like the chat can use the overlay */}
      {/* Also for teh delete modal on home page can use a diff one that uses the other overlay
    //   or can pass in a prop to choose.
      */}
      <div className="overlay " />
      {/* So this  */}
      <Dialog.Content
        data-theme="night"
        className=" DialogContent rounded-box modal-box z-50 mx-auto max-w-xl  overflow-auto  overscroll-contain shadow-xl"
      >
        <Dialog.Title className="text-lg font-bold capitalize text-white">
          {title}
        </Dialog.Title>
        <Dialog.Description className=" ">
          <div className="pt-6 pb-2 text-white">{description}</div>
        </Dialog.Description>

        <Dialog.Close asChild>
          <button
            className="  btn-sm btn-circle btn absolute top-2 right-2"
            aria-label="Close"
          >
            ✕
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogDemo;
