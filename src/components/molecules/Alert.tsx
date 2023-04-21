import React, { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";

interface AlertProps {
  message: string;
  type?: "error" | "info" | "success";
}

const Alert: React.FC<AlertProps> = ({ message, type = "error" }) => {
  const [visible, setVisible] = useState(true);

  if (!message?.length || !visible) {
    return null;
  }

  const handleClick = () => {
    setVisible(false);
  };

  return (
    <div
      className={` relative mx-auto w-[95%] rounded p-4 alert-${type} mb-8 flex cursor-pointer flex-row items-center justify-between shadow-lg`}
      onClick={handleClick}
    >
      <span>{message}</span>

      <button>
        <FaRegWindowClose className="my-auto text-xl " />
      </button>
    </div>
  );
};

export default Alert;
