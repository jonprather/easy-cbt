// components/About.tsx
import React from "react";
import BottomNav from "src/components/BottomNav";
import Layout from "src/components/Layout";
const About: React.FC = () => {
  return (
    <Layout>
      <>
        {/* TODO the page jumps compared to others ie the ehader shifts to the right */}
        <div className="container mx-auto min-h-screen max-w-[90%] py-20 sm:max-w-[80%]  md:max-w-[60%]">
          <h1 className="mb-6 text-4xl font-bold text-primary">
            About Our App
          </h1>

          <p className="mb-4 text-lg">
            We wanted to build an app that we truly cared about – something that
            would make Cognitive Behavioral Therapy (CBT) easier to learn and
            use. CBT has a wealth of scientific support and carries low risk
            outside of its application to recent traumas (within 6 months). Our
            goal is to help people by making CBT accessible to everyone.
          </p>

          <p className="mb-4 text-lg">
            We researched the main complaints of other apps and found that the
            most common issues were related to price and ease of use. Many
            people were suffering but couldn&apos;t afford the cost of these
            apps. We decided to address this problem by making our app free.
          </p>

          <p className="mb-4 text-lg">
            Users were also frustrated with losing their saved work. To resolve
            this issue, we implemented an autosave feature. Additionally, we
            prioritized transparency by making our app open-source. Now anyone
            can benefit from CBT.
          </p>

          <p className="mb-4 text-lg">
            While we believe that it&apos;s best to work with a therapist, our
            hope is that individuals can use this app to improve their mental
            health. We&apos;re committed to making CBT more accessible and
            user-friendly for everyone.
          </p>
        </div>
        <BottomNav />
      </>
    </Layout>
  );
};

export default About;

// TODO i think this about page would be better served attached to a landing page and
// this app should just focus on app stuff maybe use different subdomains
