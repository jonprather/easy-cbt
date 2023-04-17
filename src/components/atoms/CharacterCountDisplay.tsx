import React from "react";

interface CharCountDisplayProps {
  currentCount: number;
  charLimit?: number;
}

const CharCountDisplay: React.FC<CharCountDisplayProps> = ({
  currentCount,
  charLimit = 500,
}) => {
  return (
    <div>
      {currentCount}/{charLimit}
    </div>
  );
};

export default CharCountDisplay;
