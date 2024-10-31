// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  media: false,
  // theme: {
  //     extend: {},
  // },
  theme: {
      extend: {
          screens: {
              sm: '640px', // Small screens
              md: '768px', // Medium screens
              lmd: '940px',
              lg: '1024px', // Large screens
              xl: '1280px', // Extra-large screens
          },
      },
  },
  variants: {
      extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
