import React, { useState } from "react";
import Layout from "../components/Layout";
import CBTAppTemplate from "src/components/organisms/CBTAppTemplate";

// TODO fix this type to be accurate then can use it to know prisma types
// could reuse the columns from nav steps here as well
function CreateJournalEntry() {
  return (
    <Layout>
      <CBTAppTemplate title="New CBT Journal" />
    </Layout>
  );
}
export default CreateJournalEntry;
