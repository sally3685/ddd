"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { social } from "../../../generated/prisma";
import FacebookIframe from "./FacebookIframe";
import YoutubeIframe from "./YoutubeIframe";
import InstaIframe from "./InstaIframe";

export default function Social({
  t,
  lang,
  socialItems,
}: {
  t: any;
  lang: string;
  socialItems: social[];
}) {
  const [step, setStep] = useState(0);
  const [face, setFace] = useState<{ embed: string; channel: string }>({
    embed: "",
    channel: "",
  });
  const [insta, setInsta] = useState<{ embed: string; channel: string }>({
    embed: "",
    channel: "",
  });
  const [you, setYou] = useState<{ embed: string; channel: string }>({
    embed: "",
    channel: "",
  });
  useEffect(() => {
    socialItems.map((item) => {
      if (item.name === "facebook") {
        setFace({ embed: item.embededlink, channel: item.channelLink });
      }
      if (item.name === "instagram") {
        setInsta({ embed: item.embededlink, channel: item.channelLink });
      }
      if (item.name === "youtube") {
        setYou({ embed: item.embededlink, channel: item.channelLink });
      }
    });
  }, [socialItems]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const instaRef = useRef<HTMLDivElement>(null);
  const facebookRef = useRef<HTMLDivElement>(null);
  const youTubeRef = useRef<HTMLDivElement>(null);
  // Register plugins

  const renderAnimatedText = (text: string) => {
    return (
      <h1
        ref={titleRef}
        className="relative top-[11%] z-[0] flex h-full w-full items-center justify-center overflow-hidden text-2xl font-bold text-black sm:text-4xl xl:text-5xl"
      >
        {text.split("").map((letter, i) => (
          <span
            key={i}
            className="letter inline-block translate-y-full opacity-0"
            style={{ display: letter === " " ? "inline" : "inline-block" }}
          >
            {letter}
          </span>
        ))}
      </h1>
    );
  };

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const [isMounted, setIsMounted] = useState(false);
  useGSAP(() => {
    // Clear previou
    // s timeline
    if (
      !isMounted ||
      !facebookRef.current ||
      !instaRef.current ||
      !youTubeRef.current
    )
      return;
    if (tlRef.current) {
      tlRef.current.kill();
    }
    gsap.registerPlugin(ScrollTrigger);

    // Create new timeline
    tlRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "20% 41%",
        end: "20% 41%",
      },
    });

    // Letter animation
    tlRef.current
      .to(".letter", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.05,
        ease: "ease.out(0.5)",
      })
      .fromTo(
        [facebookRef.current, instaRef.current, youTubeRef.current],
        {
          y: 600,
          ease: "ease.out(0.5)",
        },
        {
          duration: 1,
          stagger: 0.5,
          y: 0,
        },
        "<=0.2",
      );

    return () => {
      // Cleanup
      if (tlRef.current) {
        tlRef.current.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [lang, isMounted]); // Re-run when lang changes

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;
  return (
    <div
      ref={containerRef}
      className="relative flex h-auto w-full flex-wrap items-center justify-center gap-[30px] px-4 py-20 lg:block lg:h-full lg:gap-0"
    >
      {lang === "en" ? (
        renderAnimatedText("Get Social")
      ) : (
        <h1 className="relative z-[0] flex h-full w-full items-center justify-center overflow-hidden text-2xl font-bold text-black sm:text-4xl xl:text-5xl">
          مواقع التواصل
        </h1>
      )}

      <div
        ref={instaRef}
        className="relative top-0 left-0 scale-[1]! rounded-2xl lg:absolute lg:top-[5%] lg:left-[28%] lg:scale-[0.7]"
      >
        <div className="absolute top-[-10px] left-[-10px] z-[3] flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#5F9FD6]">
          <Link href={insta.channel}>
            <div className="size-[60px] rounded-full bg-[url(/insta.png)] bg-contain bg-center"></div>
          </Link>
        </div>

        <Suspense fallback={<p>loading...</p>}>
          <InstaIframe insta={insta}></InstaIframe>
        </Suspense>
      </div>
      <div
        ref={youTubeRef}
        className="bg-grey-600 relative top-0 left-0 scale-[1]! rounded-2xl lg:absolute lg:top-1/2 lg:left-[10%] lg:scale-none"
      >
        <div className="absolute top-[-10px] left-[-10px] z-[3] flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#5F9FD6]">
          <Link href={you.channel}>
            <div className="size-[60px] rounded-full bg-[url(/youtube.png)] bg-contain bg-center"></div>
          </Link>
        </div>

        <Suspense fallback={<p>loading...</p>}>
          <YoutubeIframe you={you}></YoutubeIframe>
        </Suspense>
      </div>

      <div
        ref={facebookRef}
        className="relative top-0 left-0 scale-[1]! rounded-2xl lg:absolute lg:top-[40%] lg:left-[70%] lg:scale-[0.9]"
      >
        <div className="absolute top-[-20px] left-[-10px] z-[3] flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#5F9FD6]">
          <Link href={face.channel}>
            <div className="size-[60px] rounded-full bg-[url(/facebook.png)] bg-contain bg-center"></div>
          </Link>
        </div>
        <Suspense fallback={<p>loading...</p>}>
          <FacebookIframe face={face}></FacebookIframe>
        </Suspense>
      </div>
    </div>
  );
}
