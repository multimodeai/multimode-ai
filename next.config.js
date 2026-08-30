/** @type {import('next').NextConfig} */
const nextConfig = {
  // The promptkit route reads content/promptkits/<slug>.md via a RUNTIME-constructed
  // path. Next's static tracing cannot see that, so without this the markdown is not
  // bundled into the serverless function and every kit 404s in production while
  // working fine locally. Do not remove.
  outputFileTracingIncludes: {
    "/promptkit/[slug]": ["./content/promptkits/**/*.md"],
  },
};

module.exports = nextConfig;
