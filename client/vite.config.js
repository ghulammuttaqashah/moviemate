import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate', // auto-update service worker
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'], // optional extra assets
      manifest: {
        name: 'MovieMate',
        short_name: 'MovieMate',
        description: 'Your Personal Movie Hub 🎬 Discover, Share & Vote for Movies You Love',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'logo192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'logo512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        navigateFallback: '/index.html', // ensures React routing works for unknown paths
        navigateFallbackDenylist: [/^\/api\//], // don't fallback API requests
      }
    })
  ],
  build: {
    outDir: 'dist', // default output folder
  }
});