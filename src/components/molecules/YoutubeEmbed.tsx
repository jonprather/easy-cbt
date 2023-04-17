// components/YouTubeEmbed.tsx
import React from "react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

interface YouTubeEmbedProps {
  videoId: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId }) => {
  const src = `https://www.youtube.com/embed/${videoId}`;

  return (
    <AspectRatio ratio={16 / 9}>
      <iframe
        className="h-full w-full"
        src={src}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </AspectRatio>
  );
};

export default YouTubeEmbed;
