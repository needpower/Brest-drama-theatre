import { Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import React from 'react';
import Header from 'ui/Header';
import Switcher from './Switcher';
import st from './style.module.scss';

export default function App() {
  return (
    <Grommet theme={grommet} className={st.app}>
      <Header />
      <Box>
        <Switcher />
      </Box>
    </Grommet>
  );
}
