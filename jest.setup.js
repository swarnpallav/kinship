// Mock react-native-reanimated to avoid native dependency issues in Jest
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
)

// Silence Reanimated warning: useNativeDriver is not supported because the native animated module is missing
global.__reanimatedWorkletInit = () => {}
