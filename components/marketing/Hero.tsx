"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";

function useIsClient() {
  return useSyncExternalStore(() => () => {}, () => true, () => false);
}

/* ── Animated counter ─────────────────────────────────────── */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const step = Math.ceil(duration / target);
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + 1, target);
            setVal(current);
            if (current >= target) clearInterval(timer);
          }, step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Student cards ─────────────────────────────────────────── */
const students = [
  {
    photo: "https://images.pexels.com/photos/28593048/pexels-photo-28593048.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
    fallback: "👧🏾",
    name: "Adaeze",
    info: "Yr 10 · Lagos",
    subject: "Maths",
    result: "E8 → B2 WAEC",
  },
  {
    photo: "https://images.pexels.com/photos/26855714/pexels-photo-26855714.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    fallback: "👦🏾",
    name: "Emeka",
    info: "Yr 6 · Abuja",
    subject: "English",
    result: "Passed 11+",
  },
  {
    photo: "https://images.pexels.com/photos/11025021/pexels-photo-11025021.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    fallback: "👧🏿",
    name: "Blessing",
    info: "Yr 8 · London",
    subject: "Science",
    result: "C → A* GCSE",
  },
  {
    photo: "https://images.pexels.com/photos/9090818/pexels-photo-9090818.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    fallback: "👦🏾",
    name: "Tolu",
    info: "Yr 11 · Manchester",
    subject: "GCSE",
    result: "Grade 4 → 8",
  },
];

/* ── Card photo sub-component with fallback ──────────────── */
function CardPhoto({ src, fallback, alt, fill }: { src: string; fallback: string; alt: string; fill?: boolean }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-5xl">
        {fallback}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : 400}
      height={fill ? undefined : 300}
      className="object-cover"
      onError={() => setErrored(true)}
      sizes="(max-width: 768px) 50vw, 25vw"
    />
  );
}

export default function Hero() {
  const [activeCard, setActiveCard] = useState(0);
  const mounted = useIsClient();

  useEffect(() => {
    const t = setInterval(() => setActiveCard(p => (p + 1) % students.length), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-screen bg-brand-deepGreen overflow-hidden flex items-center">

      {/* ── Background grid ── */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px] pointer-events-none" />
      <div className="absolute top-[-20%] right-[-12%] w-[600px] h-[600px] rounded-full bg-brand-midGreen/20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-8%] w-[400px] h-[400px] rounded-full bg-brand-yellow/6 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-16 right-16 w-44 h-44 border border-brand-yellow/10 rounded-[50%_0_50%_0] rotate-45 pointer-events-none hidden lg:block animate-floatSlow" />

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>

        {/* ── LEFT: Copy ── */}
        <div className="text-white space-y-7 text-center lg:text-left">

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/80 text-xs font-semibold tracking-widest px-4 py-2 rounded-full animate-fadeInUp">
            <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse-dot" />
            🇳🇬 Lagos &nbsp;·&nbsp; 🇬🇧 London &nbsp;
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.6rem] font-bold leading-[1.07] tracking-tight animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            Give Your Child the<br />
            Academic Edge<br />
            <span className="italic text-brand-yellow">They Deserve</span>
          </h1>

          <p className="text-white/65 text-lg font-light leading-relaxed max-w-md mx-auto lg:mx-0 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            Live online classes with qualified teachers.<br className="hidden sm:block" />
            Written progress report after <strong className="text-white font-semibold">every single session.</strong>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
            <Link
              href="/#book"
              className="w-full sm:w-auto text-center bg-brand-yellow hover:bg-brand-deepYellow text-brand-deepGreen font-bold px-8 py-4 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-brand-yellow/30 hover:-translate-y-1 tap-target animate-pulse-ring"
            >
              📚 Book a Session — No Payment
            </Link>
            <a
              href="https://wa.me/2347043523556?text=Hi%20Schoolhelphub%2C%20I%27d%20like%20to%20book%20a%20free%20trial."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center text-white/80 hover:text-white border border-white/20 hover:border-white/50 font-semibold px-8 py-4 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 tap-target"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397 0 11.948 0c3.179.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.239 3.48 8.421-.003 6.557-5.338 11.902-11.892 11.902-2.004-.001-3.973-.51-5.713-1.479L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.747 1.451 5.436 0 9.86-4.37 9.864-9.742.002-2.602-1.01-5.05-2.85-6.892-1.84-1.842-4.29-2.856-6.889-2.858-5.441 0-9.867 4.371-9.871 9.743-.001 1.933.507 3.821 1.474 5.485L1.922 22.18l4.725-1.026z"/></svg>
              WhatsApp Us →
            </a>
          </div>

          {/* Animated stats */}
          <div className="flex items-center justify-center lg:justify-start gap-0 pt-4 animate-fadeInUp" style={{ animationDelay: "0.45s" }}>
            {[
              { num: 500, suffix: "+", label: "Students Enrolled" },
              { num: 94, suffix: "%", label: "Attendance Rate" },
              { num: 100, suffix: "%", label: "Reports Sent" },
            ].map((s, i) => (
              <div key={i} className="flex items-stretch gap-0">
                {i > 0 && <div className="w-px bg-white/12 mx-5 sm:mx-7 self-stretch" />}
                <div className="text-center">
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-brand-yellow leading-none">
                    <CountUp target={s.num} suffix={s.suffix} />
                  </div>
                  <div className="text-white/45 text-[11px] mt-1.5 font-medium tracking-wide">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Student photo grid ── */}
        <div className="w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto animate-fadeIn" style={{ animationDelay: "0.3s" }}>

          <div className="grid grid-cols-2 gap-3 mb-3">
            {students.map((s, i) => (
              <div
                key={i}
                onClick={() => setActiveCard(i)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                  activeCard === i
                    ? "ring-2 ring-brand-yellow ring-offset-2 ring-offset-brand-deepGreen scale-[1.02]"
                    : "opacity-70 hover:opacity-95"
                } ${i === 0 ? "row-span-2" : ""}`}
                style={{ minHeight: i === 0 ? "240px" : "112px" }}
              >
                {/* Photo */}
                <CardPhoto src={s.photo} fallback={s.fallback} alt={`${s.name} — ${s.info}`} fill />

                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                {/* Active badge */}
                {activeCard === i && (
                  <div className="absolute top-2.5 right-2.5 z-20">
                    <span className="bg-brand-yellow text-brand-deepGreen text-[9px] font-extrabold px-2 py-0.5 rounded-full tracking-wider animate-bounce-in">
                      ★ RESULT
                    </span>
                  </div>
                )}

                {/* Bottom text */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-3">
                  <p className={`font-bold text-white leading-tight ${i === 0 ? "text-sm" : "text-xs"}`}>{s.name}</p>
                  <p className={`text-white/70 ${i === 0 ? "text-xs" : "text-[10px]"}`}>{s.info}</p>
                  {i === 0 && (
                    <div className="mt-2 bg-white/15 backdrop-blur-sm rounded-lg px-2.5 py-1.5 inline-block">
                      <p className="text-[9px] text-white/65">{s.subject}</p>
                      <p className="text-brand-yellow text-[11px] font-bold">{s.result}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Active result card */}
          <div className="bg-white/8 backdrop-blur-sm border border-white/12 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={students[activeCard].photo}
                    alt={students[activeCard].name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{students[activeCard].name} · {students[activeCard].subject}</p>
                  <p className="text-white/50 text-xs">{students[activeCard].info}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-white/50 uppercase tracking-wider mb-1">Result</p>
                <p className="text-brand-yellow font-bold text-sm">{students[activeCard].result}</p>
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {students.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveCard(i)}
                className={`rounded-full transition-all duration-300 tap-target cursor-pointer ${
                  activeCard === i ? "w-6 h-2 bg-brand-yellow" : "w-2 h-2 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
