"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PhotoSection from "./PhotoSection";
import confetti from "canvas-confetti";

type Gallery = {
  image: string;
  caption: string;
  side: "left" | "right";
};

const gallery: Gallery[] = [
  {
    image: "/val1.png",
    caption: "When we first started dating",
    side: "left",
  },
  {
    image: "/val2.png",
    caption: "We became fond of each other",
    side: "right",
  },
  {
    image: "/val3.png",
    caption: "I couldn't be away from you",
    side: "left",
  },
  {
    image: "/val4.png",
    caption: "Little addition to our family",
    side: "right",
  },
  {
    image: "/val5.png",
    caption: "The moments that matter the most",
    side: "left",
  },
  {
    image: "/val6.png",
    caption: "The waterfall couldn't keep us apart",
    side: "right",
  },
  {
    image: "/val7.png",
    caption: "Realizing our future together",
    side: "left",
  },
  {
    image: "/val8.png",
    caption: "I love you more than words can say",
    side: "right",
  },
];

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ValentinesRose() {
  const containerRef = useRef<HTMLDivElement>(null);
  const roseRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasScrolledRef = useRef(false);
  const [message] = useState(
    "Time and time again, I appreciate the person I've become with you. All through the years you are always by my side. I wish to keep it this way forever. You challenge me, you inspire me, you help me grow, you are my best friend, my best dish 😜 and my calm place 😌. I love you more than words can say.",
  );
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Dynamic values based on content
  const totalScreens = gallery.length + 2;
  const maxScale = isMobile
    ? Math.min(4, gallery.length * 0.3 + 1.5)
    : Math.min(8, gallery.length * 0.5 + 2);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Play music on first scroll
    const handleFirstScroll = () => {
      if (!hasScrolledRef.current && audioRef.current) {
        hasScrolledRef.current = true;
        audioRef.current.volume = 0.25;
        audioRef.current.play().catch((err) => {
          console.log("Audio play failed:", err);
        });
        setIsPlaying(true);
        window.removeEventListener("scroll", handleFirstScroll);
      }
    };
    window.addEventListener("scroll", handleFirstScroll, { once: false });

    // GSAP Scroll Animation for Rose Scaling
    gsap.fromTo(
      roseRef.current,
      { scale: 0.2, rotate: -15, opacity: 0.1 },
      {
        scale: maxScale,
        rotate: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      },
    );

    // Fade out intro on scroll
    gsap.to(".intro-section", {
      scrollTrigger: {
        trigger: ".intro-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      opacity: 0,
      y: -50,
    });

    // Reveal footer message only at the very end, triggered from the last reveal section
    setTimeout(() => {
      const lastRevealSection = document.querySelectorAll(".reveal-section")[
        gallery.length - 1
      ] as HTMLElement;
      if (lastRevealSection) {
        gsap.to(".footer-message", {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: lastRevealSection,
            start: "bottom center",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, 100);

    // Animate photosections with parallax effect
    gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 100, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "top 40%",
            scrub: true,
          },
        },
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleFirstScroll);
    };
  }, [maxScale]);

  const handleConfetti = () => {
    const heart = confetti.shapeFromPath({
      path: "M167 72c19,-38 37,-56 75,-56c44,0 75,33 75,77c0,84 -76,122 -150,201c-74,-79 -150,-117 -150,-201c0,-44 31,-77 75,-77c38,0 56,18 75,56z",
    });
    confetti({
      shapes: [heart],
      particleCount: 150,
      spread: 100,
      origin: { y: 0.8 },
      colors: ["#e11d48", "#fb7185", "#be123c"],
    });
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => {
          console.log("Audio play failed:", err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    // Placeholder for auto-play effect (removed - now plays on first scroll)
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative bg-[#fafaf9] selection:bg-rose-500/10 overflow-x-hidden"
      style={{ height: `${totalScreens * 100}vh` }}
    >
      {/* Hidden Audio Player */}
      <audio
        ref={audioRef}
        src="/allofme.mp3"
        loop
        crossOrigin="anonymous"
      />

      {/* Music Control Button */}
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-30 group bg-white/80 backdrop-blur-xl border border-rose-100 rounded-full p-3 shadow-lg hover:bg-white hover:shadow-xl transition-all active:scale-95"
        aria-label={isPlaying ? "Pause music" : "Play music"}
        title={isPlaying ? "Pause music" : "Play music"}
      >
        <svg
          className="w-6 h-6 text-rose-600 group-hover:text-rose-700 transition-colors"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          {isPlaying ? (
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          ) : (
            <path d="M8 5v14l11-7z" />
          )}
        </svg>
      </button>

      {/* Central Scaling Rose - Shifted up slightly to accommodate footer */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <div
          ref={roseRef}
          className="select-none transform-gpu leading-none flex items-center justify-center will-change-transform"
          aria-label="Decorative rose that grows as you scroll"
          role="img"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-[80px] sm:text-[100px] md:text-[120px] drop-shadow-[0_0_30px_rgba(225,29,72,0.15)] transition-none">
            🌹
          </span>
        </div>
      </div>

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#fafaf9_85%)] pointer-events-none z-0" />

      {/* Intro prompt */}
      <div className="intro-section h-screen flex flex-col items-center justify-center relative z-10 p-6 text-center">
        <style>{`
          @keyframes heartPulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }
          .animate-heart-pulse {
            animation: heartPulse 2s ease-in-out infinite;
          }
        `}</style>
        <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none overflow-hidden">
          <svg
            viewBox="0 0 32 29.6"
            className="w-[110vw] md:w-[70vw] max-w-5xl fill-rose-300 drop-shadow-[0_0_50px_rgba(225,29,72,0.4)] blur-[60px] animate-heart-pulse"
          >
            <path
              d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
            c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
            />
          </svg>
        </div>
        <h2 className="text-rose-800/40 uppercase tracking-[0.3em] text-sm mb-4 animate-pulse">
          Our love started with a single moment
        </h2>
        <h1 className="text-4xl md:text-6xl text-zinc-900 font-serif italic mb-8">
          Scroll to see our journey
        </h1>
        <div className="w-px h-24 bg-linear-to-b from-rose-400 to-transparent" />
      </div>

      {/* Photo Layers */}
      {gallery.map((photo, index) => (
        <div key={photo.image} className="reveal-section">
          <PhotoSection
            image={photo.image}
            caption={photo.caption}
            side={photo.side}
            index={index}
          />
        </div>
      ))}

      {/* Empty space for scrolling - final reveal happens here */}
      <div className="h-screen" />

      {/* Fixed Live Footer Message - Revealed via GSAP */}
      <div
        className="footer-message fixed bottom-0 left-0 w-full p-4 sm:p-6 z-20 pointer-events-none opacity-0 translate-y-10"
        role="region"
        aria-label="Valentine's message"
      >
        <div className="bg-white/80 backdrop-blur-xl border border-rose-100 shadow-2xl p-6 sm:p-8 md:p-12 text-center text-zinc-900 max-w-lg mx-auto pointer-events-auto rounded-4xl">
          <h1 className="text-base sm:text-lg md:text-xl font-serif mb-4 leading-tight text-rose-950">
            Happy Valentine&apos;s babe,
          </h1>
          <p className="text-sm sm:text-base md:text-md italic text-rose-800/80 mb-8 leading-relaxed">
            {message}
          </p>
          <button
            onClick={handleConfetti}
            aria-label="Celebrate with confetti hearts"
            className="group relative px-6 sm:px-8 py-2 sm:py-3 bg-rose-600 rounded-full font-bold text-base sm:text-lg text-white hover:bg-rose-500 transition-all active:scale-95 shadow-[0_10px_25px_-5px_rgba(225,29,72,0.4)]"
          >
            Please explode me
            <div className="absolute inset-0 rounded-full border border-white/20 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
