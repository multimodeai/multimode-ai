"use client";

import { useState, FormEvent } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://formspree.io/f/mankbdyw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          let's see if this is worth your time.
        </h2>
        <p className="text-warm-gray mb-12">
          bring a solicitation you chased or missed. thirty minutes, no deck, and
          I&apos;ll tell you straight if I am not the right fit.
        </p>

        <div className="mb-10">
          <a
            href="mailto:hello@multimodeai.com"
            className="text-charcoal hover:text-sage-dark transition-colors font-medium"
          >
            hello@multimodeai.com
          </a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              name
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 bg-cream border border-warm-gray/20 focus:border-sage focus:outline-none transition-colors"
              placeholder="your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              email
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 bg-cream border border-warm-gray/20 focus:border-sage focus:outline-none transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              what&apos;s eating your time?
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full px-4 py-3 bg-cream border border-warm-gray/20 focus:border-sage focus:outline-none transition-colors resize-none"
              placeholder="what are you chasing, and what is slowing it down?"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="bg-charcoal text-cream px-8 py-4 text-sm font-medium tracking-wide hover:bg-sage-dark transition-colors duration-300 disabled:opacity-50"
          >
            {status === "sending" ? "sending..." : "book a consultation"}
          </button>

          {status === "sent" && (
            <p className="text-sage-dark text-sm">
              message sent! we&apos;ll get back to you within 24 hours.
            </p>
          )}

          {status === "error" && (
            <p className="text-red-600 text-sm">
              something went wrong. please try again or email us directly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
