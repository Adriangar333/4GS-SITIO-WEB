import type { NextConfig } from "next";

const cspHeader = `
    default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval';
    script-src 'self' https: 'unsafe-inline' 'unsafe-eval';
    style-src 'self' https: 'unsafe-inline';
    img-src 'self' https: blob: data:;
    font-src 'self' https: data:;
    connect-src 'self' https: wss: blob: data:;
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`;

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
