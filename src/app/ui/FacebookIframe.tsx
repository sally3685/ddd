import React from "react";

const FacebookIframe = ({
  face,
}: {
  face: { embed: string; channel: string };
}) => {
  return (
    <iframe
      src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F${face.embed}&tabs=timeline&width=300&height=350&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`}
      width="310"
      height="360"
      scrolling="no"
      className="h-[300px]! w-[300px]! rounded-2xl lg:h-[360px]! lg:w-[310px]!"
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share "
    ></iframe>
  );
};

export default FacebookIframe;
