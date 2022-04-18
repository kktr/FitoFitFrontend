/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  excludeFile: (str) => /\*.{spec,test}.js/.test(str),
  images: { domains: ['cryptic-gorge-42821.herokuapp.com'] },
};

module.exports = nextConfig;
