import React from "react";

interface ErrorMessageProps {
  showMessage: boolean;
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  showMessage,
  message,
}) => {
  if (!showMessage) {
    return null;
  }

  return (
    <div className="alert alert-error shadow-lg">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 flex-shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <label>{message || "An error has occurred. Please try again."}</label>
      </div>
    </div>
  );
};

export default ErrorMessage;

// TODO improve this so that you can try again either by page refresh or some other means...
