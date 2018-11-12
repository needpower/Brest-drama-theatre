import React from 'react';
import { Box, Button, TextInput } from 'grommet';
import { LinkPrevious } from 'grommet-icons';
import { goBack } from 'infrastructure/router';
import st from './style.module.scss';

export default function Search() {
  return (
    <Box
      background="neutral-5"
      height="100vh"
      overflow="auto"
      pad={{ horizontal: 'xlarge', vertical: 'small' }}
      width="100%"
    >
      <Box align="center" direction="row" justify="start" className={st.searchInput}>
        <Button icon={<LinkPrevious color="#fff" />} onClick={goBack} plain hoverIndicator />
        <TextInput plain type="search" />
      </Box>
    </Box>
  );
}
