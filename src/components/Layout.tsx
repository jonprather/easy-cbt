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
      <div className=" bg-base-100 sm:pb-20">
        <Navbar />
        {children}
        <BottomNav />
      </div>
    </>
  );
};
export default Layout;
