import React from "react";

type SaveStatus = "unsaved" | "saving" | "saved" | "error";

interface SaveStatusIndicatorProps {
  status: SaveStatus;
}

const SaveStatusIndicator: React.FC<SaveStatusIndicatorProps> = ({
  status,
}) => {
  return (
    <div className="  mt-4 flex items-center justify-end space-x-2">
      <div
        className={`h-3 w-3 rounded-full ${
          status === "unsaved"
            ? "bg-yellow-400"
            : status === "saving"
            ? "animate-pulse bg-blue-400"
            : status === "saved"
            ? "bg-green-400"
            : "bg-red-400"
        }`}
      ></div>
      <span className="min-w-[4.5rem] text-sm font-semibold">
        {status === "unsaved"
          ? "Unsaved"
          : status === "saving"
          ? "Saving..."
          : status === "saved"
          ? "Saved"
          : "Error"}
      </span>
    </div>
  );
};

export default SaveStatusIndicator;
