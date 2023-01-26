import React from "react";
import Navbar from "./Navbar";
import Head from "next/head";

export default function Layout({
  title = "EasyCBT",
  keywords = "CBT, Mental Health, App",
  description = "CBT Training app and diary",
  children,
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <div className=" bg-zinc-900  ">
        <Navbar />
        {children}
      </div>
    </>
  );
}
