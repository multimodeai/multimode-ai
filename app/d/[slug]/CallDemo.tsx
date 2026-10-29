"use client";

import { useEffect, useState } from "react";
import type { Line, Step } from "./scripts";

export default function CallDemo({
  lines,
  ownerText,
  steps,
  footnote,
  caller,
  time,
}: {
  lines: Line[];
  ownerText: string;
  steps?: Step[];
  footnote?: string;
  caller: string;
  time: string;
}) {
  const [shown, setShown] = useState(0);
  const after: Step[] =
    steps && steps.length
      ? steps
      : [{ label: "A minute later, on your phone", kind: "owner", text: ownerText }];
  const total = lines.length + after.length;

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

      <div className="mt-5 space-y-4">
        {after.slice(0, Math.max(0, shown - lines.length)).map((st, i) => (
          <div key={i} className="animate-[fadeIn_0.6s_ease]">
            <p className="text-xs uppercase tracking-wider text-warm-gray mb-2">{st.label}</p>
            {st.kind === "calendar" ? (
              <div className="rounded-2xl bg-white border border-black/10 overflow-hidden">
                <div className="bg-[#1a73e8] text-white text-xs px-4 py-1.5">Google Calendar</div>
                <div className="px-4 py-3">
                  <p className="font-semibold">{st.title}</p>
                  <p className="text-[14px] leading-snug text-warm-gray mt-1">{st.text}</p>
                </div>
              </div>
            ) : st.kind === "after" ? (
              <div className="rounded-2xl bg-beige px-4 py-3 text-[15px] leading-snug">{st.text}</div>
            ) : (
              <div className={`rounded-2xl p-4 ${st.kind === "owner" ? "bg-charcoal text-white" : "bg-white border border-black/10"}`}>
                <p className={`text-xs mb-1 ${st.kind === "owner" ? "text-white/60" : "text-warm-gray"}`}>Text message</p>
                <p className="text-[15px] leading-snug">{st.text}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {shown >= total && footnote && (
        <p className="mt-4 text-xs text-warm-gray leading-relaxed">{footnote}</p>
      )}

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
