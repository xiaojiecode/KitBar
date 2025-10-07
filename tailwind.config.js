/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // 这里应该是顶级配置
  theme: {
    extend: {
      colors: {
        // 主题颜色
        primary: '#3B82F6', // 蓝色作为主题色
        secondary: '#8B5CF6', // 紫色作为辅助色
        neutral: '#1F2937', // 中性色
        card: {
          DEFAULT: '#FFFFFF',
          dark: '#1F2937'
        },
        background: {
          DEFAULT: '#F9FAFB',
          dark: '#111827'
        },
        text: {
          primary: '#111827',
          secondary: '#4B5563',
          light: '#F9FAFB',
          muted: '#6B7280'
        },
        border: {
          DEFAULT: '#E5E7EB',
          dark: '#374151'
        },
        input: {
          DEFAULT: '#F3F4F6',
          dark: '#1F2937'
        }
      }
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
