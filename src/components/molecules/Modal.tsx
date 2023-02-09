import React from "react";
import { FaInfoCircle } from "react-icons/fa";

interface ModalProps {
  id: string;
  content: string | JSX.Element;
  title: string;
  icon?: JSX.Element;
  labelText: string;
}
const Modal: React.FC<ModalProps> = ({
  id,
  content,
  title,
  labelText,
  icon = (
    <span className="text-md  bg-transparent   p-0">
      <FaInfoCircle />
    </span>
  ),
}) => {
  return (
    <div className="ml-0">
      <label
        htmlFor={id}
        className="flex items-center justify-end text-lg hover:cursor-pointer"
      >
        <span className="label-text  mr-2 capitalize text-white">
          {labelText}
        </span>{" "}
        {icon}
      </label>

      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor={id}
            className="btn-sm btn-circle btn absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold capitalize text-white">{title}</h3>
          <div className="py-5 text-white">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
