// test.js - Test examples for QR Code Generator
const { generateQRCode } = require('./generate-png');
const { applyTheme, applySize, generateFilename } = require('./utils');

/**
 * Test basic QR code generation
 */
async function testBasicGeneration() {
  console.log('🧪 Testing basic QR code generation...\n');

  try {
    const url = 'https://github.com';
    const outputPath = './test-outputs/basic-test.png';

    await generateQRCode(url, outputPath);
    console.log('✅ Basic generation test passed\n');
  } catch (error) {
    console.error('❌ Basic generation test failed:', error.message);
  }
}

/**
 * Test theme application
 */
async function testThemes() {
  console.log('🧪 Testing themes...\n');

  const themes = ['default', 'dark', 'blue', 'green', 'red', 'purple'];
  const testUrl = 'https://example.com/theme-test';

  for (const theme of themes) {
    try {
      const config = applyTheme(theme, { width: 300 });
      const outputPath = `./test-outputs/theme-${theme}.png`;

      console.log(`Testing ${theme} theme...`);
      await generateQRCode(testUrl, outputPath, config);
      console.log(`✅ ${theme} theme test passed`);
    } catch (error) {
      console.error(`❌ ${theme} theme test failed:`, error.message);
    }
  }
  console.log('');
}

/**
 * Test size presets
 */
async function testSizes() {
  console.log('🧪 Testing size presets...\n');

  const sizes = ['small', 'medium', 'large'];
  const testUrl = 'https://example.com/size-test';

  for (const size of sizes) {
    try {
      const config = applySize(size);
      const outputPath = `./test-outputs/size-${size}.png`;

      console.log(`Testing ${size} size...`);
      await generateQRCode(testUrl, outputPath, config);
      console.log(`✅ ${size} size test passed`);
    } catch (error) {
      console.error(`❌ ${size} size test failed:`, error.message);
    }
  }
  console.log('');
}

/**
 * Test custom configurations
 */
async function testCustomConfig() {
  console.log('🧪 Testing custom configurations...\n');

  const testCases = [
    {
      name: 'High Error Correction',
      config: { errorCorrectionLevel: 'H', width: 400, margin: 3 },
    },
    {
      name: 'Custom Colors',
      config: {
        color: { dark: '#FF6B6B', light: '#4ECDC4' },
        width: 350,
        margin: 2,
      },
    },
    {
      name: 'Large with Custom Margin',
      config: { width: 600, margin: 5, errorCorrectionLevel: 'M' },
    },
  ];

  for (const testCase of testCases) {
    try {
      const filename = generateFilename(testCase.name);
      const outputPath = `./test-outputs/${filename}`;

      console.log(`Testing ${testCase.name}...`);
      await generateQRCode('https://example.com/custom-test', outputPath, testCase.config);
      console.log(`✅ ${testCase.name} test passed`);
    } catch (error) {
      console.error(`❌ ${testCase.name} test failed:`, error.message);
    }
  }
  console.log('');
}

/**
 * Test error handling
 */
async function testErrorHandling() {
  console.log('🧪 Testing error handling...\n');

  const errorTests = [
    {
      name: 'Empty text',
      text: '',
      outputPath: './test.png',
      shouldFail: true,
    },
    {
      name: 'Invalid width',
      text: 'test',
      outputPath: './test.png',
      config: { width: 5000 },
      shouldFail: true,
    },
    {
      name: 'Invalid error correction',
      text: 'test',
      outputPath: './test.png',
      config: { errorCorrectionLevel: 'X' },
      shouldFail: true,
    },
  ];

  for (const test of errorTests) {
    try {
      await generateQRCode(test.text, test.outputPath, test.config);
      if (test.shouldFail) {
        console.log(`❌ ${test.name}: Expected error but test passed`);
      } else {
        console.log(`✅ ${test.name}: Test passed as expected`);
      }
    } catch (error) {
      if (test.shouldFail) {
        console.log(`✅ ${test.name}: Error caught as expected - ${error.message}`);
      } else {
        console.log(`❌ ${test.name}: Unexpected error - ${error.message}`);
      }
    }
  }
  console.log('');
}

/**
 * Main test function
 */
async function runTests() {
  console.log('🚀 Starting QR Code Generator Tests\n');
  console.log('='.repeat(50));

  await testBasicGeneration();
  await testThemes();
  await testSizes();
  await testCustomConfig();
  await testErrorHandling();

  console.log('='.repeat(50));
  console.log('🎉 All tests completed!\n');
  console.log('Check the ./test-outputs/ directory for generated QR codes.');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests };
