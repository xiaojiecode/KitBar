/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 现代化扁平化主题颜色
        primary: '#3B82F6', // 蓝色作为主色调
        secondary: '#8B5CF6', // 紫色作为辅助色
        accent: '#10B981', // 绿色作为强调色
        warning: '#F59E0B', // 黄色作为警告色
        danger: '#EF4444', // 红色作为危险色
        // 扁平化风格的背景和卡片颜色
        card: {
          DEFAULT: '#FFFFFF',
          dark: '#1E293B'
        },
        background: {
          DEFAULT: '#F8FAFC',
          dark: '#0F172A'
        },
        // 文本颜色
        text: {
          primary: '#1E293B',
          secondary: '#64748B',
          light: '#F8FAFC',
          muted: '#94A3B8'
        },
        // 边框颜色
        border: {
          DEFAULT: '#E2E8F0',
          dark: '#334155'
        },
        // 输入框颜色
        input: {
          DEFAULT: '#F1F5F9',
          dark: '#1E293B'
        }
      },
      // 扁平化阴影
      boxShadow: {
        'flat': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'flat-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'flat-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'flat-hover': '0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      // 炫酷动画效果
      animation: {
        // 淡入效果
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'fade-in-left': 'fadeInLeft 0.6s ease-out',
        'fade-in-right': 'fadeInRight 0.6s ease-out',
        // 缩放效果
        'scale-in': 'scaleIn 0.4s ease-out',
        'scale-up': 'scaleUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        // 弹性效果
        'bounce-in': 'bounceIn 0.6s ease-out',
        'spring': 'spring 1s ease-out',
        // 旋转效果
        'spin-slow': 'spin 4s linear infinite',
        'rotate-in': 'rotateIn 0.6s ease-out',
        // 浮动效果
        'float': 'float 3s ease-in-out infinite',
        'float-hover': 'floatHover 2s ease-in-out infinite',
        // 滑动效果
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        // 延迟动画
        'fade-in-delay-100': 'fadeIn 0.5s ease-in-out 100ms both',
        'fade-in-delay-200': 'fadeIn 0.5s ease-in-out 200ms both',
        'fade-in-delay-300': 'fadeIn 0.5s ease-in-out 300ms both',
        'fade-in-up-delay-100': 'fadeInUp 0.6s ease-out 100ms both',
        'fade-in-up-delay-200': 'fadeInUp 0.6s ease-out 200ms both',
        'fade-in-up-delay-300': 'fadeInUp 0.6s ease-out 300ms both',
        'fade-in-right-delay-300': 'fadeInRight 0.6s ease-out 300ms both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        spring: {
          '0%': { transform: 'scale(0.8)' },
          '20%': { transform: 'scale(1.1)' },
          '40%': { transform: 'scale(0.95)' },
          '60%': { transform: 'scale(1.02)' },
          '80%': { transform: 'scale(0.98)' },
          '100%': { transform: 'scale(1)' },
        },
        rotateIn: {
          '0%': { opacity: '0', transform: 'rotate(-30deg) scale(0.8)' },
          '100%': { opacity: '1', transform: 'rotate(0) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatHover: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      }
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
