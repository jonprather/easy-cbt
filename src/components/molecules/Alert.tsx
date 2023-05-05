import React, { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";

interface AlertProps {
  message: string;
  type?: "error" | "info" | "success";
  alertIsVisible: boolean;
  setAlertIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Alert: React.FC<AlertProps> = ({
  message,
  type = "error",
  alertIsVisible,
  setAlertIsVisible,
}) => {
  if (!message?.length || !alertIsVisible) {
    return null;
  }

  const getClassname = () => {
    console.log("GETCLASSNAME:", `alert-${type}`);
    return `alert-${type}`;
  };
  const handleClick = () => {
    setAlertIsVisible(false);
  };
  // TODO Alert-x class doesnt show && this shows up again on going to later pages and will keep showing up again when go to page two etc
  // have to handle the visibility in the parent state
  return (
    <div
      className={`relative mx-auto w-[95%] rounded p-2 pl-4 pr-2  ${getClassname()} mb-8 flex cursor-pointer flex-row items-center justify-between shadow-lg`}
      onClick={handleClick}
    >
      <span>{message}</span>

      <button className="p-4">
        <FaRegWindowClose className="my-auto text-xl " />
      </button>
    </div>
  );
};

export default Alert;
