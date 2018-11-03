import React from 'react';
import { ThemeProvider } from 'mineral-ui/themes';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import Header from 'ui/Header';
import Switcher from './Switcher';

export default function App() {
  return (
    <ThemeProvider>
      <Flex direction="column">
        <FlexItem>
          <Header />
        </FlexItem>
        <FlexItem>
          <Switcher />
        </FlexItem>
      </Flex>
    </ThemeProvider>
  );
}
