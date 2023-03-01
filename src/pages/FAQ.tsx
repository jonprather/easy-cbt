import React from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import Layout from "src/components/Layout";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import RadixCollapse from "src/components/molecules/RadixCollapse";
const FaqsPage: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <Layout>
      <>
        <h1 className="mx-auto flex flex-col items-center justify-center pt-20 text-center text-lg">
          Frequently Asked Questions
        </h1>
        <RadixCollapse title="IM A TITLE" content="IM some content" />
        <RadixCollapse title="IM A TITLE2" content="IM some content2" />
        {/* Some jank on the margins and such also wha twas the abstraction for the other one i guess it didnt have a trigger */}
        {/* Add more FAQ items here */}
      </>
    </Layout>
  );
};

export default FaqsPage;
