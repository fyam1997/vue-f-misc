import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// ref: https://github.com/wuruoyun/vue-component-lib-starter

export default defineConfig({
    base: "./",
    plugins: [vue()],
})
