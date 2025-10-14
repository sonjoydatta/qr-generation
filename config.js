// config.js - Centralized configuration for QR Code Generator
module.exports = {
  // Default QR Code Settings
  defaults: {
    errorCorrectionLevel: 'H', // L, M, Q, H - Higher level provides better error recovery
    type: 'png',
    width: 400,
    margin: 2,
    color: {
      dark: '#000000', // Black dots/modules
      light: '#FFFFFF', // White background
    },
  },

  // Predefined themes
  themes: {
    default: {
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    },
    dark: {
      color: {
        dark: '#FFFFFF',
        light: '#000000',
      },
    },
    blue: {
      color: {
        dark: '#1E40AF',
        light: '#DBEAFE',
      },
    },
    green: {
      color: {
        dark: '#166534',
        light: '#DCFCE7',
      },
    },
    red: {
      color: {
        dark: '#DC2626',
        light: '#FEE2E2',
      },
    },
    purple: {
      color: {
        dark: '#7C3AED',
        light: '#F3E8FF',
      },
    },
  },

  // Size presets
  sizes: {
    small: { width: 200, margin: 1 },
    medium: { width: 400, margin: 2 },
    large: { width: 800, margin: 4 },
    xlarge: { width: 1200, margin: 6 },
  },

  // Error correction levels with descriptions
  errorCorrection: {
    L: { level: 'L', description: 'Low (~7%)', recovery: 0.07 },
    M: { level: 'M', description: 'Medium (~15%)', recovery: 0.15 },
    Q: { level: 'Q', description: 'Quartile (~25%)', recovery: 0.25 },
    H: { level: 'H', description: 'High (~30%)', recovery: 0.3 },
  },

  // File format options
  formats: {
    png: { extension: '.png', type: 'png', description: 'PNG Image' },
    svg: { extension: '.svg', type: 'svg', description: 'SVG Vector' },
    pdf: { extension: '.pdf', type: 'pdf', description: 'PDF Document' },
  },

  // Validation rules
  validation: {
    maxWidth: 2000,
    minWidth: 50,
    maxMargin: 20,
    minMargin: 0,
    maxTextLength: 2953, // QR Code capacity limit for alphanumeric
  },
};
