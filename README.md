# QR Code Generator

A robust and flexible QR code generator for Node.js with support for various customization options, themes, and multiple output formats.

## Features

- 🔲 **Easy QR Code Generation** - Simple API for generating QR codes
- 📄 **Multiple Formats** - Support for PNG and SVG output formats
- 🎨 **Customizable Themes** - Pre-built color themes (default, dark, blue, green, red, purple)
- 📏 **Size Presets** - Quick size configurations (small, medium, large, xlarge)
- 🛡️ **Error Correction** - Configurable error correction levels (L, M, Q, H)
- 🖥️ **CLI Support** - Command-line interface for batch operations
- ✅ **Input Validation** - Comprehensive parameter validation
- 📁 **Directory Creation** - Automatic output directory creation
- 🔍 **File Information** - Detailed file stats after generation

## Installation

```bash
npm install qrcode
```

## Quick Start

### Basic Usage

```javascript
const { generateQRCode } = require('./generate-png');

// Simple URL encoding
await generateQRCode(
  'https://example.com', 
  './my-qr-code.png'
);

// With custom configuration
await generateQRCode(
  'https://example.com',
  './custom-qr.png',
  {
    width: 600,
    margin: 4,
    errorCorrectionLevel: 'H',
    color: {
      dark: '#FF0000',
      light: '#FFFFFF'
    }
  }
);
```

### Command Line Interface

```bash
# Basic usage
node cli.js "https://example.com"

# Generate SVG format
node cli.js "Hello World" hello.svg

# Use format option
node cli.js "GitHub" github --format svg

# Advanced options
node cli.js "https://example.com" qr.png --width 600 --margin 4 --error H

# Custom colors
node cli.js "Test" test.png --dark "#FF0000" --light "#FFFFFF"
```

### CLI Options

| Option     | Short | Description                         | Default     |
| ---------- | ----- | ----------------------------------- | ----------- |
| `--width`  | `-w`  | QR code width in pixels             | 400         |
| `--margin` | `-m`  | Margin size                         | 2           |
| `--error`  | `-e`  | Error correction level (L, M, Q, H) | H           |
| `--dark`   | `-d`  | Dark color (hex)                    | #000000     |
| `--light`  | `-l`  | Light color (hex)                   | #FFFFFF     |
| `--format` | `-f`  | Output format (png, svg)            | auto-detect |
| `--help`   | `-h`  | Show help message                   | -           |

## Output Formats

### PNG Format

- **Best for**: Web display, printing, sharing
- **Pros**: Universal support, good compression
- **Cons**: Fixed resolution, larger file sizes

### SVG Format

- **Best for**: Web integration, scalable graphics, professional printing
- **Pros**: Infinitely scalable, smaller file sizes, crisp at any size
- **Cons**: Limited support in some older applications

```bash
# Auto-detect format from extension
node cli.js "Hello" output.svg    # Creates SVG
node cli.js "Hello" output.png    # Creates PNG

# Explicit format specification
node cli.js "Hello" output --format svg   # Creates output.svg
node cli.js "Hello" output --format png   # Creates output.png
```

## Configuration

### Default Settings

```javascript
const config = {
  errorCorrectionLevel: 'H',  // High error correction
  type: 'png',
  width: 400,
  margin: 2,
  color: {
    dark: '#000000',   // Black
    light: '#FFFFFF'   // White
  }
};
```

### Themes

The generator includes several pre-built themes:

```javascript
const { applyTheme } = require('./utils');

// Available themes: default, dark, blue, green, red, purple
const config = applyTheme('dark', { width: 500 });
await generateQRCode('https://example.com', 'qr.png', config);
```

### Size Presets

Quick size configurations for common use cases:

```javascript
const { applySize } = require('./utils');

// Available sizes: small (200px), medium (400px), large (800px), xlarge (1200px)
const config = applySize('large');
await generateQRCode('https://example.com', 'qr.png', config);
```

### Error Correction Levels

| Level | Recovery | Description        |
| ----- | -------- | ------------------ |
| L     | ~7%      | Low                |
| M     | ~15%     | Medium             |
| Q     | ~25%     | Quartile           |
| H     | ~30%     | High (recommended) |

## API Reference

### `generateQRCode(text, outputPath, customConfig)`

Generates a QR code and saves it as a PNG file.

**Parameters:**
- `text` (string): Text or URL to encode
- `outputPath` (string): Path where the PNG file will be saved
- `customConfig` (object, optional): Custom configuration options

**Returns:** Promise<string> - Path to the generated file

**Example:**
```javascript
const path = await generateQRCode(
  'https://example.com',
  './output/qr-code.png',
  { width: 600, margin: 4 }
);
console.log(`QR code saved to: ${path}`);
```

### Utility Functions

```javascript
const {
  isValidUrl,
  validateParameters,
  applyTheme,
  applySize,
  generateFilename 
} = require('./utils');

// URL validation
const isUrl = isValidUrl('https://example.com'); // true

// Auto-generate filename
const filename = generateFilename('My QR Code Text'); // my_qr_code_text_2025-10-14.png

// Apply theme
const themedConfig = applyTheme('blue', { width: 500 });

// Apply size preset
const sizedConfig = applySize('large');
```

## File Structure

```
qr-generation/
├── generate-png.js    # Main generator module
├── cli.js            # Command-line interface
├── config.js         # Configuration and presets
├── utils.js          # Utility functions
├── package.json      # Dependencies
└── README.md         # Documentation
```

## Examples

### Business Card QR Code

```javascript
const businessCard = `BEGIN:VCARD
VERSION:3.0
FN:John Doe
ORG:Example Corp
TEL:+1234567890
EMAIL:john@example.com
URL:https://johndoe.com
END:VCARD`;

await generateQRCode(businessCard, './business-card-qr.png', {
  width: 300,
  margin: 3,
  errorCorrectionLevel: 'H'
});
```

### WiFi QR Code

```javascript
const wifiConfig = 'WIFI:T:WPA;S:MyNetwork;P:MyPassword;H:false;';

await generateQRCode(wifiConfig, './wifi-qr.png', {
  width: 400,
  margin: 2,
});
```

### Event QR Code with Theme

```javascript
const { applyTheme } = require('./utils');

const eventUrl = 'https://example.com/event/12345';
const config = applyTheme('purple', { 
  width: 500, 
  margin: 3,
  errorCorrectionLevel: 'M' 
});

await generateQRCode(eventUrl, './event-qr.png', config);
```

## Error Handling

The generator includes comprehensive error handling:

```javascript
try {
  await generateQRCode('', 'output.png'); // Empty text
} catch (error) {
  console.error(error.message); // "Text parameter is required and must be a string"
}

try {
  await generateQRCode('test', 'output.png', { width: 5000 }); // Invalid width
} catch (error) {
  console.error(error.message); // "Width must be between 50 and 2000 pixels"
}
```

## Validation Rules

- **Text length**: Maximum 2,953 characters (QR code capacity limit)
- **Width**: Between 50 and 2,000 pixels
- **Margin**: Between 0 and 20
- **Error correction**: Must be L, M, Q, or H
- **Colors**: Must be valid hex color codes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Changelog

### v1.0.0
- Initial release
- Basic QR code generation
- CLI support
- Theme and size presets
- Comprehensive validation
- Error handling