import React from "react";

const YoutubeIframe = ({
  you,
}: {
  you: { embed: string; channel: string };
}) => {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${you.embed}`}
      // src="https://www.youtube.com/user/webdevelopete"
      // src="https://youtube.com/user/youtube?sub_confirmation=1"
      width="300"
      height="350"
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      className="h-[300px]! w-[300px]! rounded-2xl lg:h-[350px]! lg:w-[300px]!"
    ></iframe>
  );
};

export default YoutubeIframe;
