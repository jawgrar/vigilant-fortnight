import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Routes from './navigation/index';

export default function App() {
  return (
    <PaperProvider>
      <Routes />
    </PaperProvider>
  );
}