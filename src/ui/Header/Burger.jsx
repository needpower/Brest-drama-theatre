import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import classes from 'classnames';
import st from './style.module.scss';

export default function Burger({ menuOpened }) {
  const classNames = classes(st.menuBurger, {
    [st.opened]: menuOpened,
  });
  return (
    <Fragment>
      <span className={classNames} />
      <span className={st.menuLabel}>Меню</span>
    </Fragment>
  );
}

Burger.propTypes = {
  menuOpened: PropTypes.bool,
};

Burger.defaultProps = {
  menuOpened: false,
};
