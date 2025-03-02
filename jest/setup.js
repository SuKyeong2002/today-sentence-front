import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// Jest 환경에서 AsyncStorage를 Mock 처리
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
