import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// 添加@别名
import path from "path";
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
});
