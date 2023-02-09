import React from "react";
import Navbar from "./Navbar";
import Head from "next/head";

import BottomNav from "./BottomNav";
interface Props {
  title?: string;
  keywords?: string;
  description?: string;
  children: JSX.Element;
}
const Layout: React.FC<Props> = ({
  title = "EasyCBT",
  keywords = "CBT, Mental Health, App",
  description = "CBT Training app and diary",
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <div className="layout bg-base-300  xs:min-h-screen">
        <Navbar />
        {children}
      </div>
    </>
  );
};
export default Layout;
