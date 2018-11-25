import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading } from 'grommet';
import { NavLink } from 'redux-first-router-link';
import classes from 'classnames';
import navigationConfig from './config';
import st from './style.module.scss';

export default function Navigation({ onClick, opened }) {
  const className = classes(st.overlay, {
    [st.opened]: opened,
  });
  return (
    <Box
      background="dark-1"
      className={className}
      height="100vh"
      pad={{ vertical: 'xlarge' }}
      width="100%"
    >
      <Box tag="nav" className={st.nav}>
        {navigationConfig.map(link => (
          <Heading key={link.path.type} level="2" margin="small" size="large">
            <NavLink
              exact
              onClick={onClick}
              activeClassName={st.active}
              className={st.navLink}
              to={link.path}
            >
              {link.name}
            </NavLink>
          </Heading>
        ))}
      </Box>
    </Box>
  );
}

Navigation.propTypes = {
  onClick: PropTypes.func,
  opened: PropTypes.bool,
};

Navigation.defaultProps = {
  onClick: null,
  opened: false,
};
