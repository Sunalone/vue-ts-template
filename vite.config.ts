import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
    return {
        base: "./",
        server: {
            proxy: {
                "/api": {
                    target: "",
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/\/^api/, ""),
                },
            },
        },
        resolve: {
            alias: {
                "@": resolve(__dirname, "./src"),
            },
            extensions: [".ts", ".js"],
        },
        plugins: [
            vue(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
        build: {
            sourcemap: mode === "development" ? true : false,
        },
        css: {
            preprocessorOptions: {
                less: {
                    charset: false,
                    additionalData: `@import "${resolve(__dirname, "./src/globalStyle.less")}";`,
                },
            },
        },
    };
});
