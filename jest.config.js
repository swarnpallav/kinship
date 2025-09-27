module.exports = {
  preset: 'jest-expo',
  setupFiles: [],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/jest.setup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@react-native-community|expo(nent)?|@expo|unimodules|react-native-reanimated|lucide-react-native)',
  ],
}
