import React, { useEffect, useRef } from "react";
import Plyr, { Options, SourceInfo } from "plyr";
import "plyr/dist/plyr.css";

interface PlyrPlayerProps {
  source: SourceInfo;
  options?: Options;
  className?: string;
  style?: React.CSSProperties;
}

const PlyrComponent: React.FC<PlyrPlayerProps> = ({
  source,
  options,
  className,
  style,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const player = new Plyr(video, options);

      // Load the source
      player.source = source;

      // return () => {
      //   player.destroy();
      // };
    }
  }, [options, source]);

  return (
    <video ref={videoRef} className={`plyr ${className || ""}`} style={style} />
  );
};

export default PlyrComponent;
