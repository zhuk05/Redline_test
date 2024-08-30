import {defineConfig} from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    esbuild: {
        loader: 'jsx',
        include: /\.(jsx|js)$/,
        exclude: [],
    },
});
