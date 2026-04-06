/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        // Custom color palette from the original design
        'default-button': '#f5f5f5',
        'primary-text': '#343637',
        'menu-text': '#1C1C1C',
        'secondary-bg': '#F4F9FC',
        'button-glow': '#458BC1',
        'dark-bg': '#003E6E',
        'dark-button': '#002847',
        'icon-default': '#03314B',
        'icon-active': '#0365F2',
        'menu-active-bg-start': '#E8F1FF',
        'menu-active-bg-end': '#F2F7FF',
        'menu-active-border': '#D1E3FF',
        'menu-hover-bg': '#F1F6F4',
        'menu-hover-border': '#E0E9F1',
        'button-line': '#E5E7EB',
        'button-icon': '#1D1D1D',
        'mobile-text': '#333333',
        'mobile-secondary': '#666666',
        'mobile-hover': '#F5F5F5',
        'mobile-footer': '#003E6E',
        'mobile-active': '#4FBAE9',
        'dashboard-bg': '#F8FCFF',
        'danger-color': '#FF4D4F',
        'success-color': '#52C41A',
        'warning-color': '#FAAD14',
        'info-color': '#1890FF',
      },
      backgroundColor: {
        'dashboard-bg': '#F8FCFF',
        'default-button': '#f5f5f5',
        'secondary-bg': '#F4F9FC',
        'button-glow': '#458BC1',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-in': 'slideIn 0.2s ease-out',
        'zoom-in': 'zoomIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}