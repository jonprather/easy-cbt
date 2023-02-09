import { type NextPage } from "next";
import Link from "next/link";
import Layout from "../components/Layout";
import Table from "../components/Table";
const Home: NextPage = () => {
  return (
    <Layout>
      <main className=" min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#000709] to-[#022f42]">
        <div className=" flex flex-col items-center justify-center gap-12 px-4 py-16 pb-4 ">
          <div className="mx-auto text-center">
            <h1 className="mb-3 text-5xl font-extrabold uppercase tracking-tight text-white sm:text-[5rem]">
              EASY<span className="text-[hsl(186,100%,70%)]">CBT</span>
            </h1>
            <p className="max-w-xs text-xl font-medium text-white xs:max-w-sm sm:max-w-lg ">
              {/*  */}
              Track your thoughts, moods and progress with CBT
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/create"
            >
              <h3 className="text-2xl font-bold">New CBT Journal</h3>
              <div className="text-lg">Open the CBT App. </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://www.youtube.com/watch?v=ZdyOwZ4_RnI"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Guide</h3>
              <div className="text-lg">Learn the basics of CBT.</div>
            </Link>
          </div>
        </div>
        <div className=" flex flex-col items-center gap-2">
          <div className=" mx-auto mb-16 flex max-w-full justify-center">
            <Table />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
