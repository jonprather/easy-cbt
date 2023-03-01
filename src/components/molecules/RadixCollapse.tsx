import React, { useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

interface CollapseProps {
  title: string;
  content: string;
  trigger?: JSX.Element | string;
}

const RadixCollapse: React.FC<CollapseProps> = ({
  title,
  content,
  trigger,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      className="mx-auto mt-8 flex flex-col items-center justify-center"
    >
      <Collapsible.Trigger className="faq-question data-[state=closed]:border-box  rounded-box   relative  mx-auto w-full max-w-3xl  bg-neutral text-center transition-colors duration-300 data-[state=open]:rounded-b-none data-[state=open]:text-primary">
        <h2 className="faq-question-title collapse-title mx-auto w-1/2 text-xl font-medium">
          {title}
        </h2>
        {/* not sure the right abstraction here as would need two icons tirgerOpen trigger Closed maybe thats how */}
        {/* {trigger && (
          <button className="absolute top-4 right-4 text-xl">{trigger}</button>
        )} */}
        {/* Can make an array of objects with the props title and contnet and then loop can have help with that */}
        {/* Improve the animations make them all TW if possible */}
        {/* TODO improve the abstraction more... make it more reusabel could use similar on other proejcts would be cool if
even easer to reuse and used stying options themes from daisy ui  */}
        <div className="absolute top-4 right-4 text-xl">
          {isOpen ? (
            <span className=" ">
              <FaCaretUp />
            </span>
          ) : (
            <span className=" ">
              <FaCaretDown />
            </span>
          )}
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content className="faq-answer CollapsibleContent collapse-content rounded-b-box mx-auto w-full max-w-3xl transform bg-neutral p-6 pt-1 text-base   transition-opacity duration-300 data-[state=open]:row-start-2 data-[state=closed]:opacity-0 data-[state=open]:opacity-100">
        <p className="faq-answer-text">{content}</p>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default RadixCollapse;
