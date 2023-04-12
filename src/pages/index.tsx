import { type NextPage } from "next";
import Link from "next/link";
import Layout from "../components/Layout";
import Table from "../components/Table";
import BottomNav from "src/components/BottomNav";
import Image from "next/image";
const Home: NextPage = () => {
  return (
    <Layout>
      <>
        <main className=" min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#000709] to-[#022f42]">
          <div className=" flex flex-col items-center justify-center gap-12 px-4 py-16 pb-4 ">
            <div className="mx-auto text-center">
              <div className=" flex items-center justify-center">
                {/* TODO finsih adding this check edge cases on sizes make srue its vertically centered as well etc just added this here as img and to nav but also make NExt IMG */}
                <h1
                  id="home-title"
                  className="mb-3 ml-2  text-5xl font-extrabold uppercase tracking-tight text-white sm:text-[5rem]"
                >
                  <div className=" absolute top-4 left-4 h-10 w-10">
                    <Image
                      alt="logo"
                      src="/logo.svg"
                      fill
                      className="relative w-12  xs:hidden"
                    />
                  </div>
                  <span className="">EASY</span>
                  <span className=" text-[hsl(186,100%,70%)]">CBT</span>
                </h1>
              </div>

              <p className="max-w-xs text-xl font-medium text-white xs:max-w-sm sm:max-w-lg ">
                {/*  */}
                Track your thoughts, moods and progress with CBT
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                href="/create"
                data-testid="create-link"
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
        <BottomNav />
      </>
    </Layout>
  );
};

export default Home;

// TODO would be cool to add search filter and sort to the prev journals...
// can search based on name, filter by date or mood, sort by date mood etc, or alpha by name
