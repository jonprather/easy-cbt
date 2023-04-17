import React from "react";
import type { TSaveStatus } from "../organisms/CBTAppTemplate";

interface SaveStatusIndicatorProps {
  status: TSaveStatus;
}
const getClassNameFromStatus = (status: TSaveStatus): string => {
  if (status === "unsaved") return "bg-yellow-400";
  if (status === "saving") return "animate-pulse bg-blue-400";
  if (status === "error") "bg-red-400";

  return "bg-green-400";
};

const SaveStatusIndicator: React.FC<SaveStatusIndicatorProps> = ({
  status,
}) => {
  return (
    <div className="  mt-4 flex items-center justify-end space-x-2">
      <div
        className={`h-3 w-3 rounded-full ${getClassNameFromStatus(status)}`}
      ></div>
      <span className="min-w-[4.5rem] text-sm font-semibold capitalize">
        {status}
      </span>
    </div>
  );
};

export default SaveStatusIndicator;
