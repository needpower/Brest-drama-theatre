import React from 'react';
import PropTypes from 'prop-types';
import classes from 'classnames';
import { Box } from 'grommet';
import st from './style.module.scss';

export default function Burger({ menuOpened, onClick }) {
  const classNames = classes(st.menuBurger, {
    [st.opened]: menuOpened,
  });
  const menuTrigger = classes(st.menuTrigger, {
    [st.opened]: menuOpened,
  });
  return (
    <Box
      className={menuTrigger}
      align="center"
      direction="row"
      gap="small"
      justify="start"
      onClick={onClick}
    >
      <span className={classNames} />
      <span className={st.menuLabel}>Меню</span>
    </Box>
  );
}

Burger.propTypes = {
  menuOpened: PropTypes.bool,
  onClick: PropTypes.func,
};

Burger.defaultProps = {
  menuOpened: false,
  onClick: null,
};
