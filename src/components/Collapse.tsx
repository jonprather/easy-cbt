import React, { useState } from "react";
interface CollapseProps {
  evidence: string | undefined;
  title: string;
}
const Collapse: React.FC<CollapseProps> = ({ evidence, title }) => {
  // TODO so errors could be used but they are not cleanly mapped ie the names are diff and the indexs
  // wont nedd match bc obj
  return (
    <div className="collapse-arrow rounded-box collapse border border-base-300 bg-base-100">
      <input type="checkbox" className="peer" />
      <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
        {title}
      </div>
      <div className="collapse-content overflow-hidden text-ellipsis whitespace-nowrap  bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
        <ul>
          {evidence?.split("\n").map((evidence, i) => (
            <li
              key={i}
              className="sm:text-md whitespace-pre-line break-words text-sm italic decoration-gray-700"
            >
              {evidence}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Collapse;

// TODO if use stepper this way could also pass down errors to show for each label like mark them red
// and give msg

// TODO continue using daisyui to improve forms i worked on outsides but not all of them
// also settle bg colors on lg would be nice if worked on light mode as well
