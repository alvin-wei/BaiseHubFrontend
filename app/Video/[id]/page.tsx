// pages/video/[id].tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Skeleton } from "@mantine/core";
import { Options, SourceInfo } from "plyr";
import DynamicPlyrComponent from "../../../components/player/warp";

const VideoPage = () => {
  const { id } = useParams();
  const [videoData, setVideoData] = useState<{
    source: SourceInfo;
    options: Options;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await fetchVideoData(id as string);
        setVideoData(data);
      }
    };
    fetchData();
  }, [id]);

  if (!videoData) {
    return <Skeleton height={500} width={800} />;
  }

  return (
    <div>
      <h1>Video {id}</h1>
      <DynamicPlyrComponent
        source={videoData.source}
        options={videoData.options}
      />
    </div>
  );
};

async function fetchVideoData(id: string) {
  // const response = await fetch(`/api/videos/${id}`);
  // const data = await response.json();
  const data = {
    source: {
      type: "video" as const,
      sources: [
        {
          src: "/Besties720p.mp4",
          type: "video/mp4",
          size: 720,
        },
        {
          src: "/Besties1080p.mp4",
          type: "video/mp4",
          size: 1080,
        },
      ],
    },
    options: {
      controls: [
        "rewind",
        "play",
        "fast-forward",
        "progress",
        "current-time",
        "duration",
        "mute",
        "volume",
        "settings",
        "fullscreen",
      ],
      i18n: {
        restart: "Restart",
        rewind: "Rewind {seektime}s",
        play: "Play",
        pause: "Pause",
        fastForward: "Forward {seektime}s",
        seek: "Seek",
        seekLabel: "{currentTime} of {duration}",
        played: "Played",
        buffered: "Buffered",
        currentTime: "Current time",
        duration: "Duration",
        volume: "Volume",
        mute: "Mute",
        unmute: "Unmute",
        enableCaptions: "Enable captions",
        disableCaptions: "Disable captions",
        download: "Download",
        enterFullscreen: "Enter fullscreen",
        exitFullscreen: "Exit fullscreen",
        frameTitle: "Player for {title}",
        captions: "Captions",
        settings: "Settings",
        menuBack: "Go back to previous menu",
        speed: "Speed",
        normal: "Normal",
        quality: "Quality",
        loop: "Loop",
      },
      autoplay: false,
    },
  };
  return data;
}

export default VideoPage;
