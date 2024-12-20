import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["jspdf", "jspdf-autotable",'firebase/compat/app', 'firebase/compat/storage','@iconify/react'],
    exclude: ["bootstrap"]
  }
})
