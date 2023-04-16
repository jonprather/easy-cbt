import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import CBTAppTemplate from "src/components/organisms/CBTAppTemplate";
import Layout from "src/components/Layout";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const UpdateNote = () => {
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { data: sessionData } = useSession();
  useEffect(() => {
    const ids = router?.query?.id as string;
    if (Array.isArray(ids)) {
      setId(ids[0] as string);
    } else {
      setId(ids);
    }
  }, [router.query]);
  const getPost = api.CBT.getOne.useQuery(
    { id: id },
    {
      enabled: !!id && router?.isReady && sessionData?.user !== undefined,
      staleTime: 60 * 1000, // data can remain stale for 60 seconds
      onError: () => {
        toast.error("Error loading Journal");
        setError("Error");
        // Handle error accordingly.
      },
    }
  );

  return (
    <Layout>
      <CBTAppTemplate
        title="Update CBT Journal"
        initialData={getPost?.data}
        error={error}
      />
    </Layout>
  );
};

export default UpdateNote;
