// utils.js - Utility functions for QR Code Generator
const fs = require('fs').promises;
const path = require('path');
const config = require('./config');

/**
 * Validates if the provided text is a valid URL
 * @param {string} text - Text to validate
 * @returns {boolean} - True if valid URL, false otherwise
 */
function isValidUrl(text) {
  try {
    new URL(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates QR code generation parameters
 * @param {string} text - Text to encode
 * @param {string} outputPath - Output file path
 * @param {Object} qrConfig - QR configuration object
 * @throws {Error} - If validation fails
 */
function validateParameters(text, outputPath, qrConfig = {}) {
  // Validate text
  if (!text || typeof text !== 'string') {
    throw new Error('Text parameter is required and must be a string');
  }

  if (text.length > config.validation.maxTextLength) {
    throw new Error(`Text exceeds maximum length of ${config.validation.maxTextLength} characters`);
  }

  // Validate output path
  if (!outputPath || typeof outputPath !== 'string') {
    throw new Error('Output path parameter is required and must be a string');
  }

  // Validate width
  if (qrConfig.width) {
    const width = parseInt(qrConfig.width);
    if (isNaN(width) || width < config.validation.minWidth || width > config.validation.maxWidth) {
      throw new Error(`Width must be between ${config.validation.minWidth} and ${config.validation.maxWidth} pixels`);
    }
  }

  // Validate margin
  if (qrConfig.margin !== undefined) {
    const margin = parseInt(qrConfig.margin);
    if (isNaN(margin) || margin < config.validation.minMargin || margin > config.validation.maxMargin) {
      throw new Error(`Margin must be between ${config.validation.minMargin} and ${config.validation.maxMargin}`);
    }
  }

  // Validate error correction level
  if (qrConfig.errorCorrectionLevel && !config.errorCorrection[qrConfig.errorCorrectionLevel]) {
    throw new Error(`Error correction level must be one of: ${Object.keys(config.errorCorrection).join(', ')}`);
  }
}

/**
 * Ensures the output directory exists
 * @param {string} filePath - Path to the output file
 */
async function ensureDirectoryExists(filePath) {
  const directory = path.dirname(filePath);
  try {
    await fs.access(directory);
  } catch {
    await fs.mkdir(directory, { recursive: true });
    console.log(`📁 Created directory: ${directory}`);
  }
}

/**
 * Gets file information after generation
 * @param {string} filePath - Path to the generated file
 * @returns {Object} - File information object
 */
async function getFileInfo(filePath) {
  const stats = await fs.stat(filePath);
  const fileSizeKB = (stats.size / 1024).toFixed(2);
  const extension = path.extname(filePath).toLowerCase();

  return {
    path: filePath,
    size: stats.size,
    sizeKB: fileSizeKB,
    extension,
    created: stats.birthtime,
    modified: stats.mtime,
  };
}

/**
 * Applies a predefined theme to the configuration
 * @param {string} themeName - Name of the theme
 * @param {Object} baseConfig - Base configuration object
 * @returns {Object} - Configuration with theme applied
 */
function applyTheme(themeName, baseConfig = {}) {
  if (!config.themes[themeName]) {
    throw new Error(`Unknown theme: ${themeName}. Available themes: ${Object.keys(config.themes).join(', ')}`);
  }

  return {
    ...baseConfig,
    ...config.themes[themeName],
  };
}

/**
 * Applies a predefined size preset to the configuration
 * @param {string} sizeName - Name of the size preset
 * @param {Object} baseConfig - Base configuration object
 * @returns {Object} - Configuration with size preset applied
 */
function applySize(sizeName, baseConfig = {}) {
  if (!config.sizes[sizeName]) {
    throw new Error(`Unknown size: ${sizeName}. Available sizes: ${Object.keys(config.sizes).join(', ')}`);
  }

  return {
    ...baseConfig,
    ...config.sizes[sizeName],
  };
}

/**
 * Generates a filename based on content and timestamp
 * @param {string} text - Text content to base filename on
 * @param {string} extension - File extension (default: '.png')
 * @returns {string} - Generated filename
 */
function generateFilename(text, extension = '.png') {
  // Create a safe filename from the text
  let filename = text
    .replace(/[^a-zA-Z0-9]/g, '_') // Replace non-alphanumeric with underscore
    .replace(/_+/g, '_') // Replace multiple underscores with single
    .toLowerCase()
    .substring(0, 50); // Limit length

  // Add timestamp to make it unique
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];

  return `${filename}_${timestamp}${extension}`;
}

/**
 * Formats configuration for display
 * @param {Object} config - Configuration object
 * @returns {string} - Formatted configuration string
 */
function formatConfig(config) {
  const formatted = {
    'Error Correction': config.errorCorrectionLevel,
    Width: `${config.width}px`,
    Margin: config.margin,
    'Dark Color': config.color?.dark || 'default',
    'Light Color': config.color?.light || 'default',
  };

  return Object.entries(formatted)
    .map(([key, value]) => `  ${key}: ${value}`)
    .join('\n');
}

module.exports = {
  isValidUrl,
  validateParameters,
  ensureDirectoryExists,
  getFileInfo,
  applyTheme,
  applySize,
  generateFilename,
  formatConfig,
};
