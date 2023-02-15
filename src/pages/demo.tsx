import { type NextPage } from "next";
import Link from "next/link";
import Layout from "../components/Layout";
import Table from "../components/Table";
import BottomNav from "src/components/BottomNav";
import DialogDemo from "src/components/RadixDialog";
const Home: NextPage = () => {
  return (
    <>
      <DialogDemo
        title="Automatic Negative Thoughts"
        labelText="Automatic Thoughts"
        description={
          <>
            <p>
              List one at a time your Automatic Negative Thoughts. Automatic
              Negative thoughts are thoughts which pop into your head and have a
              negative tone.
            </p>

            <p className="pt-2">
              An example for Anxiety might be: This is too intense I cannot
              handle it.
            </p>
          </>
        }
      />
    </>
  );
};

export default Home;
