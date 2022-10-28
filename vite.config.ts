import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/outfit": {
                ws: true,
                changeOrigin: true,
                target: "https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=1",
                rewrite: (path) => path.replace(/^\/outfit/, ""),
            },
            "/image": {
                ws: true,
                changeOrigin: true,
                target: "https://api.deepai.org/api/text2img",
                rewrite: (path) => path.replace(/^\/image/, ""),
            },
        },
        cors: {
            origin: "*",
        },
    },
});
