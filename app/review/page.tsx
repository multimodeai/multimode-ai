"use client";

import { useState } from "react";

const FORMSPREE = "https://formspree.io/f/mankbdyw";

export default function ReviewPage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!rating) return;
    setStatus("sending");
    const data = new FormData(e.currentTarget);
    data.append("rating", String(rating));
    data.append("_subject", `Review — ${rating}/5 from ${data.get("name")}`);
    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <h1 className="text-3xl font-semibold tracking-tight mb-4">
            jazakallah khair.
          </h1>
          <p className="text-warm-gray leading-relaxed">
            That is genuinely useful — both the parts that are kind and the
            parts that are not. If you ticked the box, I will check with you
            before anything appears publicly.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 md:px-12 lg:px-24 py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
          how did it go?
        </h1>
        <p className="text-warm-gray leading-relaxed mb-10">
          If we have worked together, I would like to know honestly how it went.
          Two minutes. Say the awkward part too — that is the part that makes
          the next project better.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-medium mb-3">
              overall
            </label>
            <div className="flex gap-1" role="radiogroup" aria-label="rating">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={rating === n}
                  aria-label={`${n} out of 5`}
                  onClick={() => setRating(n)}
                  onMouseEnter={() => setHover(n)}
                  onMouseLeave={() => setHover(0)}
                  className={`text-4xl leading-none transition-colors ${
                    n <= (hover || rating) ? "text-sage-dark" : "text-charcoal/20"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            {!rating && (
              <p className="text-xs text-warm-gray mt-2">pick a rating to send</p>
            )}
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              name
            </label>
            <input
              id="name"
              name="name"
              required
              className="w-full border border-charcoal/20 px-4 py-3 bg-transparent focus:border-charcoal outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="org" className="block text-sm font-medium mb-2">
              company or role{" "}
              <span className="text-warm-gray font-normal">(optional)</span>
            </label>
            <input
              id="org"
              name="org"
              className="w-full border border-charcoal/20 px-4 py-3 bg-transparent focus:border-charcoal outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="what" className="block text-sm font-medium mb-2">
              what did I build for you?
            </label>
            <input
              id="what"
              name="what"
              className="w-full border border-charcoal/20 px-4 py-3 bg-transparent focus:border-charcoal outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium mb-2">
              how did it go?
            </label>
            <textarea
              id="comment"
              name="comment"
              rows={5}
              required
              placeholder="what worked, what did not, what you would want done differently"
              className="w-full border border-charcoal/20 px-4 py-3 bg-transparent focus:border-charcoal outline-none transition-colors resize-none"
            />
          </div>

          <label className="flex items-start gap-3 text-sm text-warm-gray cursor-pointer">
            <input
              type="checkbox"
              name="publish"
              value="yes"
              className="mt-1 shrink-0"
            />
            <span>
              You may quote this on multimodeai.com with my name. I will still
              check the exact wording with you first.
            </span>
          </label>

          <button
            type="submit"
            disabled={!rating || status === "sending"}
            className="inline-block bg-charcoal text-cream px-8 py-4 text-sm font-medium tracking-wide hover:bg-sage-dark transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {status === "sending" ? "sending…" : "send"}
          </button>

          {status === "error" && (
            <p className="text-sm text-red-700">
              That did not send. Email hello@multimodeai.com instead and I will
              sort it out.
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
