"use client";

const points = [
  { icon: "✅", text: "Qualified & Vetted Tutors" },
  { icon: "📋", text: "Written Report After Every Class" },
  { icon: "🎥", text: "Live + Recorded Sessions" },
  { icon: "🔒", text: "Safe & GDPR Compliant" },
];

export default function TrustBar() {
  return (
    <div className="bg-brand-green border-y border-brand-yellow/15 py-4 px-4 overflow-x-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-center min-w-max mx-auto gap-0">
        {points.map((p, i) => (
          <div key={i} className="flex items-center gap-0">
            {i > 0 && <div className="w-px h-6 bg-white/15 mx-4 sm:mx-7" />}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <span className="text-base sm:text-lg bg-white/10 w-8 h-8 rounded-lg flex items-center justify-center">
                {p.icon}
              </span>
              <span className="text-white/85 text-xs sm:text-sm font-medium whitespace-nowrap">{p.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
