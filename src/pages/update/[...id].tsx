import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import { useQuery } from "react-query";
import { api } from "../../utils/api";
import type { CBT_FormDataType } from "../types/CBTFormTypes";
import CBTAppTemplate from "src/components/organisms/CBTAppTemplate";
import Layout from "src/components/Layout";
// TODO this will have same basic template as createonly dif finstead of empty by default it should be populated with
// the rq fetch data so maybe i can resue the template and pass in taht data soehow after fetchign based on the id.

const UpdateNote = () => {
  const [id, setId] = useState("");
  const router = useRouter();

  useEffect(() => {
    let ids = router?.query?.id as string;
    if (Array.isArray(ids)) {
      setId(ids[0]);
    } else {
      setId(ids);
    }
  }, [router.query]);
  console.log("IDS", { id: id });
  const getPost = api.CBT.getOne.useQuery({ id: id });
  // TODO next i leftr off here getting the data next is to reuse the create component as a template
  // and jus tupdate how it handles props passed in so that it syncs properly
  console.log("GETPOST.data", getPost.data);
  // if i can use trpc can always do this
  //   const { data, status } = useQuery(["cbt update", id], () => {
  //     return fetch(`https://your-api.com/notes/${id}`)
  //       .then((res) => res.json())
  //       .then((data) => data);
  //   });

  //   if (status === "loading") {
  //     return <p>Loading...</p>;
  //   }

  //   if (status === "error") {
  //     return <p>Error...</p>;
  //   }

  return (
    <Layout>
      <div>
        <CBTAppTemplate initialData={getPost.data} />
      </div>
    </Layout>
  );
};

export default UpdateNote;
