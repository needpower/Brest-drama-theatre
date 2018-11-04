import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading } from 'grommet';
import { NavLink } from 'redux-first-router-link';
import classes from 'classnames';
import navigationConfig from './config';
import st from './style.module.scss';

export default function Navigation({ opened }) {
  const className = classes(st.overlay, {
    [st.opened]: opened,
  });
  return (
    <Box
      background="light-2"
      className={className}
      height="100vh"
      pad={{ horizontal: 'small', vertical: 'xlarge' }}
      width="100%"
    >
      <Box tag="nav" className={st.nav}>
        {navigationConfig.map(link => (
          <Heading key={link.path.type} level="2" margin="small" size="large">
            <NavLink to={link.path}>{link.name}</NavLink>
          </Heading>
        ))}
      </Box>
    </Box>
  );
}

Navigation.propTypes = {
  opened: PropTypes.bool,
};

Navigation.defaultProps = {
  opened: false,
};
