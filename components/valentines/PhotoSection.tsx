"use client";

import React, { useState } from "react";
import Image from "next/image";

interface PhotoSectionProps {
  image: string;
  caption: string;
  side: "left" | "right";
  index?: number;
}

export default function PhotoSection({
  image,
  caption,
  side,
}: PhotoSectionProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <section
      className={`h-screen flex items-center px-4 sm:px-6 relative z-10 pointer-events-none ${side === "left" ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`group w-60 sm:w-72 md:w-80 pointer-events-auto transition-all duration-700 ease-out cursor-pointer
          ${side === "left" ? "-rotate-6 hover:-rotate-3 hover:scale-105 hover:-translate-y-2" : "rotate-6 hover:rotate-3 hover:scale-105 hover:-translate-y-2"}`}
      >
        {/* Polaroid card outer shadow */}
        <div className="relative bg-white rounded-sm shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3),0_0_1px_0_rgba(0,0,0,0.1)] transform-gpu">
          {/* Polaroid white border around image */}
          <div className="p-3 pb-12">
            {/* Image container with subtle texture */}
            <div className="relative overflow-hidden bg-zinc-100 aspect-4/5 ring-1 ring-inset ring-zinc-200/50">
              {/* Blur placeholder */}
              {!isImageLoaded && (
                <div className="absolute inset-0 bg-linear-to-br from-zinc-200 to-zinc-100 animate-pulse" />
              )}

              <Image
                src={image}
                alt={`Memory: ${caption}`}
                loading="lazy"
                fill
                sizes="(max-width: 640px) 240px, (max-width: 768px) 288px, 320px"
                onLoad={() => setIsImageLoaded(true)}
                className={`object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out ${
                  isImageLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            {/* Bottom polaroid section - caption area */}
            <div className="mt-3">
              <p className="text-black/80 font-handwriting text-center text-lg sm:text-xl md:text-2xl leading-relaxed font-medium">
                {caption}
              </p>
            </div>

            {/* Subtle texture overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-multiply bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9Ii45IiBudW1PY3RhdmVzPSI0IiBzZWVkPSI0IiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIuNSIgLz48L3N2Zz4=')] rounded-sm" />
          </div>

          {/* Subtle pin effect */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-400 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    </section>
  );
}
