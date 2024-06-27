/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      // Configure Webpack to handle .node files
      config.module.rules.push({
        test: /\.node$/,
        use: 'node-loader',
      });
  
      return config;
    },
  };
  
  module.exports = nextConfig;