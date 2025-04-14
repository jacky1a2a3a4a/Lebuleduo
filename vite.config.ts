import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://4.240.61.223',
        changeOrigin: true,
        secure: false,
        // 確保這裡的 rewrite 設定正確
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.log('代理錯誤', err);
          });
          proxy.on('proxyReq', (_, req) => {
            console.log('發送請求到目標伺服器:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log('從目標伺服器接收回應:', proxyRes.statusCode, req.url);
          });
        },
      },
    },
    port: 5173,
    host: '0.0.0.0',
    cors: true,
  },

  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['styled-components', 'react-icons'],
        },
      },
    },
  },
});
