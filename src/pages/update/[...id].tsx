import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { api } from "../../utils/api";
import type { CBT_FormDataType } from "../types/CBTFormTypes";
// TODO this will have same basic template as createonly dif finstead of empty by default it should be populated with
// the rq fetch data so maybe i can resue the template and pass in taht data soehow after fetchign based on the id.

const UpdateNote = () => {
  const [id, setId] = useState("");
  const router = useRouter();

  useEffect(() => {
    setId(router.query.id as string);
  }, [router.query]);
  const getPost = api.CBT.getOne.useQuery({ id });

  console.log(getPost);
  // if i can use trpc can always do this
  const { data, status } = useQuery(["cbt update", id], () => {
    return fetch(`https://your-api.com/notes/${id}`)
      .then((res) => res.json())
      .then((data) => data);
  });

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Error...</p>;
  }

  return (
    <div>
      <h1>Update Note</h1>
      <p>Note ID: {id}</p>
      <p>Note Data: {JSON.stringify(data)}</p>
    </div>
  );
};

export default UpdateNote;
