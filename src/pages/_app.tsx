import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { ToastContainer } from "react-toastify";

import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { api } from "../utils/api";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div data-theme="night">
        <Component {...pageProps} />
        <ToastContainer position="top-left" />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
