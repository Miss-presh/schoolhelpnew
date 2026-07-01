"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const featuredStudent = {
  photo: "https://images.pexels.com/photos/5905866/pexels-photo-5905866.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
  fallback: "👦🏾",
  name: "Tolu",
  info: "Yr 6 · Manchester",
  result: "C → A* GCSE",
};

function HeroPhoto() {
  const [errored, setErrored] = useState(false);

  return (
    <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-3xl overflow-hidden border-2 border-white shadow-md-brand">
      {!errored ? (
        <Image
          src={featuredStudent.photo}
          alt={`${featuredStudent.name}, a Schoolhelphub student`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 90vw, 40vw"
          unoptimized
          onError={() => setErrored(true)}
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-brand-faintGreen flex items-center justify-center text-7xl">
          {featuredStudent.fallback}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-deepGreen/80 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
        <p className="text-white font-serif font-bold text-lg sm:text-xl leading-tight">{featuredStudent.name}</p>
        <p className="text-white/70 text-sm">{featuredStudent.info}</p>
        <p className="text-brand-yellow text-sm font-bold mt-1">{featuredStudent.result}</p>
      </div>
    </div>
  );
}

export default function InteractiveHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-brand-cream py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-brand-lightGreen/30">

      <div className="absolute inset-0 z-0 pointer-events-none opacity-45">
        <div className="absolute top-[-25%] left-[-15%] w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-brand-faintGreen via-brand-lightGreen/40 to-transparent blur-[130px] animate-shimmer-mesh" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-brand-yellow/15 via-brand-faintGreen to-transparent blur-[110px] animate-shimmer-mesh" style={{ animationDelay: "-3s" }} />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0B2B2004_1px,transparent_1px),linear-gradient(to_bottom,#0B2B2004_1px,transparent_1px)] bg-[size:5rem_5rem] z-0" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 w-full">

        {/* Left Column */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left animate-fadeIn">

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-brand-deepGreen tracking-tight leading-[1.1]">
            Premium Tutoring.<br />
            <span className="bg-gradient-to-r from-brand-green via-brand-midGreen to-brand-deepGreen bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
              Unrivaled Transparency.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-brand-mutedSage max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Live online tutoring for ages 5–16, with a written report after every single lesson so you always know how your child is doing.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link
              href="/free-trial"
              className="w-full sm:w-auto text-center bg-brand-yellow hover:bg-brand-deepYellow text-brand-deepGreen font-bold px-8 py-4 rounded-xl text-sm transition-all duration-150 shadow-md-brand hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm-brand tap-target"
            >
              Book Your Free Trial Session
            </Link>

            <a
              href="#pricing"
              className="w-full sm:w-auto text-center bg-white hover:bg-brand-cream text-brand-deepGreen border border-brand-lightGreen font-bold px-8 py-4 rounded-xl text-sm transition-all duration-150 shadow-sm-brand hover:-translate-y-0.5 active:translate-y-0 tap-target"
            >
              View Tier Pricing
            </a>
          </div>
        </div>

        {/* Right Column — one big photo, nothing else competing for attention */}
        <div className="lg:col-span-5 w-full max-w-sm mx-auto lg:max-w-none animate-fadeIn">
          <HeroPhoto />
        </div>
      </div>
    </section>
  );
}
