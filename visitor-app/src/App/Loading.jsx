import React from 'react';
import logo from 'ui/Header/logo.png';
import { Box } from 'grommet';
import st from './style.module.scss';

export default function Loading() {
  return (
    <Box align="center" justify="center" height="calc(100vh - 60px)">
      <img className={st.loading} src={logo} alt="loading" />
    </Box>
  );
}
