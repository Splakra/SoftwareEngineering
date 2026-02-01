import {defineConfig} from 'vite';
import {reactRouter} from "@react-router/dev/vite";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000, // Change this if you want a different dev server port
    },
});