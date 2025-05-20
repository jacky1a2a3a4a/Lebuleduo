export const theme = {
  // 主題顏色 
  colors: {
    gray: {
      0: '#fff',
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },

    greenLine: {
      light: '#3ED495',
      0: '#06c755',
      100: '#05b54c',
    },

    green: {
      100: '#dcfce7',
      700: '#15803d',
    },

      blue: {
      main: '#445DB3',
      light: '#E8EBF7',
    },

    red: {
      100: '#fee2e2',
      500: '#dc2626',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
    },

    white: '#FFFFFF',

    background: {
      primary: '#FFFFFF',
      secondary: '#F8FAFF',
      secondaryHover: '#F0F4FF',
      error: '#FFF4EB',
    },

    primary: {
      main: '#445DB3',
      hover: '#334D99',
      light: '#E8EBF7',
      rgb: '68, 93, 179',
    },

    secondary: {
      main: '#A2AED9',
      hover: '#8090B2',
    },

    tertiary: {
      main: '#F7DD97',
      hover: '#E6C26D',
    },
    
    text: {
      primary: '#1F2A52',
      secondary: '#323232',
      tertiary: '#7B7B7B',
      disabled: '#BDBDBD',
      black: '#000000',
    },

    neutral: {
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
    },
    
    error: {
      main: '#D99292',
      background: '#FFF4F4',
      hover: '#C47A7A',
    },

    success: {
      main: '#06c755',
      background: '#F0FFF4',
    },

    warning: {
      main: '#F7DD97',
      background: '#FFFBEB',
    },

    border: {
      light: '#E5E7EB',
      main: '#D1D5DB',
    },
  },

   // 陰影
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
    md: '0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06)',
    lg: '0 2.4rem 3.2rem rgba(0, 0, 0, 0.12)',
    button: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
    buttonHover: '0 7px 14px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)',
    card: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },

  // 字體大小&重量
  typography: {
    fontSizes: {
      '3xs': '0.5rem',    // 8px
      '2xs': '0.625rem',  // 10px
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      md: '1rem',         // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extraBold: 900,
    },
  },

  // 間距
  spacing: {
    '2xs': '0.125rem',  // 2px
    xs: '0.25rem',      // 4px
    sm: '0.5rem',       // 8px
    12: '0.75rem',      // 12px
    14: '0.875rem',     // 14px
    md: '1rem',         // 16px
    20: '1.25rem',      // 20px
    lg: '1.5rem',       // 24px
    xl: '2rem',         // 32px
    '2xl': '3rem',      // 48px
    '3xl': '4rem',      // 64px
    '4xl': '5rem',      // 80px
  },

  // 圓角
  borderRadius: {
    tiny: '3px',
    sm: '5px',
    md: '7px',
    lg: '9px',
    xl: '12px',
    round: '9999px',
  },

  // 斷點
  breakpoints: {
    mobile: '402px',
    mobilePlus: '403px',
  },
} as const; 