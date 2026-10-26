"use client";

import { useEffect, useState } from "react";
import type { Line } from "./scripts";

export default function CallDemo({
  lines,
  ownerText,
  caller,
  time,
}: {
  lines: Line[];
  ownerText: string;
  caller: string;
  time: string;
}) {
  const [shown, setShown] = useState(0);
  const total = lines.length + 1;

  useEffect(() => {
    if (shown >= total) return;
    const t = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 700 : 1700);
    return () => clearTimeout(t);
  }, [shown, total]);

  return (
    <div>
      <div className="rounded-2xl bg-white border border-black/10 p-4 sm:p-5">
        <div className="flex items-center justify-between text-xs text-warm-gray mb-4">
          <span>Incoming call · {caller}</span>
          <span>Mon {time}</span>
        </div>
        <div className="space-y-2.5 min-h-[260px]">
          {lines.slice(0, shown).map((l, i) => (
            <div
              key={i}
              className={`flex ${l.who === "caller" ? "justify-end" : "justify-start"}`}
            >
              <p
                className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-[15px] leading-snug ${
                  l.who === "caller"
                    ? "bg-beige text-charcoal rounded-br-md"
                    : "bg-sage-dark text-white rounded-bl-md"
                }`}
              >
                {l.text}
              </p>
            </div>
          ))}
          {shown < lines.length && (
            <p className="text-xs text-warm-gray">
              {shown % 2 === 0 ? "Assistant" : caller} is talking…
            </p>
          )}
        </div>
      </div>

      <div
        className={`mt-5 transition-opacity duration-700 ${
          shown >= total ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-xs uppercase tracking-wider text-warm-gray mb-2">
          A minute later, on your phone
        </p>
        <div className="rounded-2xl bg-charcoal text-white p-4">
          <p className="text-xs text-white/60 mb-1">Text message</p>
          <p className="text-[15px] leading-snug">{ownerText}</p>
        </div>
      </div>

      {shown >= total && (
        <button
          onClick={() => setShown(0)}
          className="mt-4 text-sm text-sage-dark underline underline-offset-4"
        >
          Play it again
        </button>
      )}
    </div>
  );
}
