import React from "react";
import YouTubeEmbed from "./YoutubeEmbed";

interface GuideSectionProps {
  title: string;
  content: string;
  videoId: string;
}

const GuideSection: React.FC<GuideSectionProps> = ({
  title,
  content,
  videoId,
}) => {
  return (
    <section className="mx-auto mb-16 max-w-[90%] sm:max-w-[80%]  md:max-w-[60%]">
      <h2 className="mb-4 text-3xl font-semibold">{title}</h2>
      <p className="mb-4">{content}</p>
      <div className=" flex justify-center pt-4 pb-4">
        <YouTubeEmbed videoId={videoId} />
      </div>
    </section>
  );
};

export default GuideSection;
