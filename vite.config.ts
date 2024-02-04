import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), UnoCSS()],
  server: {
    host: true,
    port: 8000, // This is the port which we will use in docker
    // Thanks @sergiomoura for the window fix
    // add the next lines if you're using windows and hot reload doesn't work
    watch: {
      usePolling: true,
    },
  },
});
