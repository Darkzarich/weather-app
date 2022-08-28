import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    define: {
      GEOAPIFY_API_KEY: JSON.stringify(env.GEOAPIFY_API_KEY),
      OPENWEATHER_API_KEY: JSON.stringify(env.OPENWEATHER_API_KEY),
    },
  };
});
