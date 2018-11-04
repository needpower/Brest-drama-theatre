import { Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import React from 'react';
import Header from 'ui/Header';
import Switcher from './Switcher';

export default function App() {
  return (
    <Grommet theme={grommet}>
      <Header />
      <Box>
        <Switcher />
      </Box>
    </Grommet>
  );
}
