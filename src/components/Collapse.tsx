import React, { useState } from "react";
interface CollapseProps {
  evidence: string | undefined;
  title: string;
}
const Collapse: React.FC<CollapseProps> = ({ evidence, title }) => {
  // TODO so errors could be used but they are not cleanly mapped ie the names are diff and the indexs
  // wont nedd match bc obj
  return (
    <button className="collapse-arrow rounded-box collapse mb-1 w-full border border-gray-500 bg-base-100 shadow peer-checked:border-base-100">
      <input type="checkbox" className="peer" />
      <div className="collapse-title bg-neutral text-white  peer-checked:bg-primary peer-checked:text-primary-content md:bg-slate-700">
        {title}
      </div>
      <div className="collapse-content overflow-hidden text-ellipsis whitespace-nowrap bg-neutral  text-white peer-checked:bg-primary peer-checked:text-secondary-content  md:bg-slate-700">
        <ul>
          {evidence?.split("\n").map((evidence, i) => (
            <li
              key={i}
              className="sm:text-md whitespace-pre-line break-words pt-1 text-left text-sm italic decoration-gray-700"
            >
              {evidence}
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
};

export default Collapse;

// TODO if use stepper this way could also pass down errors to show for each label like mark them red
// and give msg

// TODO continue using daisyui to improve forms i worked on outsides but not all of them
// also settle bg colors on lg would be nice if worked on light mode as well
