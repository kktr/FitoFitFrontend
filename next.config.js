/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  excludeFile: (str) => /\*.{spec,test}.js/.test(str),
};

module.exports = nextConfig;
