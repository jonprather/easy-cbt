import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import CBTAppTemplate from "src/components/organisms/CBTAppTemplate";
import Layout from "src/components/Layout";

const UpdateNote = () => {
  const [id, setId] = useState("");
  const router = useRouter();

  useEffect(() => {
    const ids = router?.query?.id as string;
    if (Array.isArray(ids)) {
      setId(ids[0]);
    } else {
      setId(ids);
    }
  }, [router.query]);
  const getPost = api.CBT.getOne.useQuery({ id: id });

  return (
    <Layout>
      <div>
        <CBTAppTemplate title="Update CBT Journal" initialData={getPost.data} />
      </div>
    </Layout>
  );
};

export default UpdateNote;
