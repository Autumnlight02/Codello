import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import generateMapping from "./vite-plugin-generateMapping.cjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    generateMapping(),
    svelte({
      compilerOptions: {
        customElement: true,
      },
    }),
  ],
});
