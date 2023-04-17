import React from "react";
import GuideSection from "src/components/molecules/GuideSection";
import Layout from "src/components/Layout";
import BottomNav from "src/components/BottomNav";

const GuidePage = () => {
  return (
    <Layout>
      <>
        <div className="mx-auto min-h-screen   bg-base-200  ">
          <div className="container mx-auto py-20 px-4">
            <h1 className="mb-8 text-center text-4xl font-semibold text-primary">
              App Walkthrough
            </h1>

            {/* SECTIONS */}
            <GuideSection
              title="Overview of the App"
              content="This free, open-source, and easy-to-use web application is designed to help users practice cognitive behavioral therapy (CBT) techniques. With a user-friendly interface and an AI helper chatbot, our app aims to provide a seamless experience for everyone.
              And in this video you can learn how to effectively use our app to practice CBT techniques."
              videoId="TBD"
            />

            <GuideSection
              title="Introduction to Cognitive Behavioral Therapy (CBT)"
              content="Cognitive behavioral therapy (CBT) is a widely-used psychotherapy technique that helps individuals identify and change negative thought patterns and behaviors. In this section, we'll provide an overview of CBT and its benefits."
              videoId="ZdyOwZ4_RnI"
            />

            {/* <GuideSection
              title="Getting Started with Our App"
              content="To get started with our app, simply create an account and log in. Once you're logged in, you can access all the app's features, such as tracking your thoughts, setting goals, and chatting with our AI helper. This video will walk you through the process of setting up your account and navigating the app."
              videoId="TBD"
            /> */}

            <GuideSection
              title="Using the AI Helper Chatbot"
              content="Our app features a helpful AI chatbot that can guide you through CBT exercises and provide support during your CBT journey. In this video, we'll show you how to interact with the chatbot, ask questions, and get the most out of this powerful feature."
              videoId="TBD"
            />
          </div>
        </div>
        <BottomNav />
      </>
    </Layout>
  );
};

export default GuidePage;
