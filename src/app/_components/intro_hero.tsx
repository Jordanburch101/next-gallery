"use client";
import React from "react";
import { WavyBackground } from "~/components/ui/wavy-background";
import { SignInButton } from "@clerk/nextjs";

export function IntroHero() {
  return (
    <WavyBackground  className="w-full pb-40">
      <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
        Next Personal Gallery
      </p>
      <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        Built with Next.js, Drizzle ORM, and Auth with Clerk
      </p>
      <div className="grid place-items-center mt-10 gap-4">
      <SignInButton>
      <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          Login to view your gallery
        </span>
      </button>
      </SignInButton>
      </div>
    </WavyBackground>
  );
}
