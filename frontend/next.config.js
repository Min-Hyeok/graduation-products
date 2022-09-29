// eslint-disable-next-line @typescript-eslint/no-var-requires
const withImages = require('next-images');

const nextConfig = withImages({
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
  images: {
    disableStaticImages: true,
  },
});

module.exports = nextConfig;
