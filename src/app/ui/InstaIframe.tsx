import React from "react";

const InstaIframe = ({
  insta,
}: {
  insta: { embed: string; channel: string };
}) => {
  return (
    <iframe
      src={`https://www.instagram.com/p/${insta.embed}/embed/`}
      // src="https://www.instagram.com/villadico/?igsh=MjBxeTA2Ynd4M3Y3#"
      width="280"
      height="300"
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      className="h-[300px]! w-[300px]! rounded-2xl lg:h-[300px]! lg:w-[280px]!"
    ></iframe>
  );
};

export default InstaIframe;
