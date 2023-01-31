import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import { api } from "../utils/api";
import Table from "../components/Table";
const Home: NextPage = () => {
  return (
    <Layout>
      <main className=" min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#0d026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            EASY<span className="text-[hsl(186,100%,70%)]">CBT</span>
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/create"
            >
              <h3 className="text-2xl font-bold">New CBT Journal</h3>
              <div className="text-lg">Open the CBT to create a new entry </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Guide</h3>
              <div className="text-lg">
                Try our tutorial or guide and get the most of of your practice.
              </div>
            </Link>
          </div>
        </div>
        <div className=" flex flex-col items-center gap-2">
          {/* <p className="text-2xl text-white">View History</p> */}
          <div className=" mx-auto mb-16 flex max-w-full justify-center">
            {/* TODO make set data global handler so can pass here...
            setData={setData}
            */}
            <Table></Table>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
