// generate-png.js - Main QR Code Generator
const QRCode = require('qrcode');
const config = require('./config');
const { validateParameters, ensureDirectoryExists, getFileInfo, isValidUrl, formatConfig } = require('./utils');

/**
 * Generates a QR code and saves it as a PNG file
 * @param {string} text - Text or URL to encode
 * @param {string} outputPath - Path where the PNG file will be saved
 * @param {Object} customConfig - Optional custom configuration
 * @returns {Promise<string>} - Path to the generated file
 */
async function generateQRCode(text, outputPath, customConfig = {}) {
  // Merge with default configuration
  const qrConfig = { ...config.defaults, ...customConfig };

  // Validate all parameters
  validateParameters(text, outputPath, qrConfig);

  // Warn if text doesn't appear to be a URL
  if (!isValidUrl(text)) {
    console.warn('⚠️  Warning: The provided text does not appear to be a valid URL');
  }

  try {
    // Ensure output directory exists
    await ensureDirectoryExists(outputPath);

    // Generate QR code
    console.log('🔲 Generating QR code...');
    console.log(`📝 Text: ${text.length > 50 ? text.substring(0, 50) + '...' : text}`);
    console.log(`📁 Output: ${outputPath}`);
    console.log(`🔧 Configuration:\n${formatConfig(qrConfig)}`);

    await QRCode.toFile(outputPath, text, qrConfig);

    // Get file information
    const fileInfo = await getFileInfo(outputPath);

    console.log(`\n✅ QR code successfully generated!`);
    console.log(`📁 File: ${fileInfo.path}`);
    console.log(`📏 Size: ${fileInfo.sizeKB} KB`);
    console.log(`� Created: ${fileInfo.created.toLocaleString()}`);

    return outputPath;
  } catch (error) {
    console.error('❌ QR code generation failed:', error.message);
    throw error;
  }
}

/**
 * Main execution function
 */
async function main() {
  const targetUrl =
    'https://toffeelive.com/en/premium-plans/PRUOG00006?utm_source=qr&utm_campaign=toffee_epl_night_2025';
  const outputFileName = './toffee_epl_night_2025.png';

  try {
    await generateQRCode(targetUrl, outputFileName);
  } catch (error) {
    console.error('Application failed:', error.message);
    process.exit(1);
  }
}

// Run the application if this file is executed directly
if (require.main === module) {
  main();
}

// Export functions for potential reuse
module.exports = {
  generateQRCode,
  isValidUrl,
  QR_CONFIG: config.defaults,
};
