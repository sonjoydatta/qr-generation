#!/usr/bin/env node
// cli.js - Command Line Interface for QR Code Generator
const { generateQRCode, isValidUrl } = require('./generate-png');

/**
 * Displays usage information
 */
function showUsage() {
  console.log(`
🔲 QR Code Generator CLI

Usage: node cli.js <text> [output-path] [options]

Arguments:
  text          Text or URL to encode in the QR code
  output-path   Output file path (default: qr-code.png)

Options:
  -w, --width <number>     QR code width in pixels (default: 400)
  -m, --margin <number>    Margin size (default: 2)
  -e, --error <level>      Error correction level: L, M, Q, H (default: H)
  -d, --dark <color>       Dark color (default: #000000)
  -l, --light <color>      Light color (default: #FFFFFF)
  -f, --format <type>      Output format: png, svg (default: auto-detect from extension)
  -h, --help               Show this help message

Examples:
  node cli.js "https://example.com"
  node cli.js "Hello World" hello.png
  node cli.js "https://example.com" qr.svg --width 600 --margin 4
  node cli.js "Test" test.png --error M --dark "#FF0000"
  node cli.js "GitHub" github --format svg
  `);
}

/**
 * Parses command line arguments
 * @param {string[]} args - Command line arguments
 * @returns {Object} - Parsed configuration
 */
function parseArguments(args) {
  if (args.length < 3 || args.includes('-h') || args.includes('--help')) {
    showUsage();
    process.exit(0);
  }

  const config = {
    text: args[2],
    outputPath: args[3] || 'qr-code.png',
    customConfig: {},
  };

  // Parse optional arguments
  for (let i = 4; i < args.length; i++) {
    const arg = args[i];
    const nextArg = args[i + 1];

    switch (arg) {
      case '-w':
      case '--width':
        if (nextArg && !isNaN(nextArg)) {
          config.customConfig.width = parseInt(nextArg);
          i++; // Skip next argument as it's the value
        }
        break;
      case '-m':
      case '--margin':
        if (nextArg && !isNaN(nextArg)) {
          config.customConfig.margin = parseInt(nextArg);
          i++;
        }
        break;
      case '-e':
      case '--error':
        if (nextArg && ['L', 'M', 'Q', 'H'].includes(nextArg.toUpperCase())) {
          config.customConfig.errorCorrectionLevel = nextArg.toUpperCase();
          i++;
        }
        break;
      case '-d':
      case '--dark':
        if (nextArg) {
          config.customConfig.color = config.customConfig.color || {};
          config.customConfig.color.dark = nextArg;
          i++;
        }
        break;
      case '-l':
      case '--light':
        if (nextArg) {
          config.customConfig.color = config.customConfig.color || {};
          config.customConfig.color.light = nextArg;
          i++;
        }
        break;
      case '-f':
      case '--format':
        if (nextArg && ['png', 'svg'].includes(nextArg.toLowerCase())) {
          const format = nextArg.toLowerCase();
          // Auto-adjust output path if no extension provided
          if (!config.outputPath.includes('.')) {
            config.outputPath += `.${format}`;
          }
          i++;
        }
        break;
    }
  }

  return config;
}

/**
 * Main CLI function
 */
async function main() {
  try {
    const { text, outputPath, customConfig } = parseArguments(process.argv);

    console.log('🔲 QR Code Generator CLI\n');

    // Validate input
    if (!text.trim()) {
      throw new Error('Text cannot be empty');
    }

    // Generate QR code
    await generateQRCode(text, outputPath, customConfig);

    console.log('\n✨ QR code generation completed successfully!');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { parseArguments, showUsage };
