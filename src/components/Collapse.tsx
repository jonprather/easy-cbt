import React, { useState } from "react";
interface CollapseProps {
  evidence: string | undefined;
  title: string;
}
const Collapse: React.FC<CollapseProps> = ({ evidence, title }) => {
  return (
    <button className="collapse-arrow rounded-box collapse mb-1 w-full border border-gray-500 bg-base-100 shadow peer-checked:border-base-100">
      <input type="checkbox" className="peer" />
      <div className="collapse-title bg-neutral italic text-white  peer-checked:bg-secondary peer-checked:text-secondary-content md:bg-slate-700">
        {title}
      </div>
      {/* <hr> <hr/> */}
      <div className="collapse-content overflow-hidden text-ellipsis whitespace-nowrap bg-neutral  text-white peer-checked:bg-secondary peer-checked:text-secondary-content  md:bg-slate-700">
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
