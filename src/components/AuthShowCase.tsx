import { api } from "../utils/api";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaPlusCircle, FaUserCircle } from "react-icons/fa";

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <button
      className="btm-nav-label sm:uppercase sm:btn-ghost sm:btn"
      onClick={sessionData ? () => void signOut() : () => void signIn()}
    >
      <span className="flex flex-col items-center justify-around gap-1 sm:flex-row  sm:text-lg">
        <span
          className=" text-lg sm:hidden
        "
          key="mobile"
        >
          <FaUserCircle />
        </span>
        <span className=" b ml-2 capitalize">
          {sessionData ? "Sign out" : "Sign in"}
        </span>
      </span>
    </button>
  );
};
export default AuthShowcase;
