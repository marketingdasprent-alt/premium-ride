import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { sites } from '@openai/sites-vite-plugin'
import { defineConfig } from 'vite'
export default defineConfig({ base: '/', plugins: [react(), tailwindcss(), sites()] })
