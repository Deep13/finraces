import React, { useEffect } from "react";

const IframeWrapper = ({ raceId }) => {
  useEffect(() => {
    console.log("Iframe Mounted");
  }, []);
  return (
    <iframe
      className="flex-1 w-full h-[700px]"
      src={`https://missionatal.com/?raceId=${raceId}`}
      loading="lazy"
      sandbox="allow-scripts allow-same-origin"
    />
  );
};

export default React.memo(IframeWrapper);
