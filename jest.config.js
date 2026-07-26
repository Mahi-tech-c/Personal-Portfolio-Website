/**
 * Jest configuration for the Personal Portfolio project.
 * Uses Node environment and looks for test files under the `tests/` directory.
 */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  // Increase timeout for async operations (e.g., DB connections)
  testTimeout: 20000,
};
