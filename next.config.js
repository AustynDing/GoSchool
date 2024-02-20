/** @type {import('next').NextConfig} */
// const chalk = require('chalk')
// const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const smp = new SpeedMeasurePlugin()
// const env = process.env.NODE_ENV
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@nivo"],
  experimental: { esmExternals: "loose", },
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  async rewrites() {
    return [
      {
        source: '/files/:path*', // 匹配所有以 /files 开头的路径
        destination: 'https://files.lsmcloud.top/:path*', // 代理到的目标地址
      },
      {
        source: '/api/:path*', // 匹配所有以 /files 开头的路径
        destination: 'https://gaokaoapi.lsmcloud.top/api/:path*', // 代理到的目标地址
        // destination: 'https://088df7d10b5146e4a444e43444c3e635.apig.cn-east-3.huaweicloudapis.com/goschool/api/:path*', // 代理到的目标地址
      },
      {
        source: '/dev/:path*', // 匹配所有以 /files 开头的路径
        destination: 'https://localhost:3000/:path*', // 代理到的目标地址
      }
    ];
  },
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    // if (env === 'development') {
    //   config.plugins.push(new ProgressBarPlugin({
    //     format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
    //   }, new BundleAnalyzerPlugin())
    //   );
    // }
    // console.log(process.env.NODE_ENV) // npm run dev - development
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.lsmcloud.top',
        port: '',
        pathname: '/**',
      },
    ],
  },
}
module.exports = nextConfig
