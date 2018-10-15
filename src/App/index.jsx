import React from 'react';
import { ThemeProvider } from 'mineral-ui/themes';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import Menu from 'ui/Menu';

export default function App() {
  return (
    <ThemeProvider>
      <Flex direction="column">
        <FlexItem>
          <Menu />
        </FlexItem>
        <FlexItem>Events list</FlexItem>
      </Flex>
    </ThemeProvider>
  );
}
