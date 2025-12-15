import {defineConfig} from 'vite';
import {reactRouter} from "@react-router/dev/vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactRouter()],
    server: {
        port: 3000, // Change this if you want a different dev server port
    },
});