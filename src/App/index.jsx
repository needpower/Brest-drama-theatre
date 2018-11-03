import React from 'react';
import { Grommet, Box } from 'grommet';
import { grommet } from 'grommet/themes';
import Header from 'ui/Header';
import Switcher from './Switcher';

export default function App() {
  return (
    <Grommet theme={grommet}>
      <Box>
        <Header />
      </Box>
      <Box>
        <Switcher />
      </Box>
    </Grommet>
  );
}
