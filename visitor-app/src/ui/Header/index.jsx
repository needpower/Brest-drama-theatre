import { Box } from 'grommet';
import { Search } from 'grommet-icons';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';
import { routes } from 'infrastructure/router/routesMap';
import Burger from './Burger';
import Menu from './Menu';
import { isSearchOpened } from './selectors';
import st from './style.module.scss';

class Header extends PureComponent {
  static propTypes = {
    searchOpened: PropTypes.bool,
  };

  static defaultProps = {
    searchOpened: false,
  };

  state = {
    menuOpened: false,
  };

  toggleMenu = () => {
    this.setState(prevState => ({ menuOpened: !prevState.menuOpened }));
  };

  render() {
    const { menuOpened } = this.state;
    const { searchOpened } = this.props;
    return (
      !searchOpened && (
        <Box align="center" direction="row" justify="between" height="60px" tag="header">
          <Burger menuOpened={menuOpened} onClick={this.toggleMenu} />
          <Box align="center" direction="row" justify="between">
            <Link className={st.navLink} to={{ type: [routes.EVENTS_LIST] }}>
              <span>Афиша</span>
            </Link>
            <Link className={st.navLink} to={{ type: [routes.SEARCH] }}>
              <span>Поиск</span>
              <Search color="black" size="20px" className={st.icon} />
            </Link>
          </Box>
          <Menu onClick={this.toggleMenu} opened={menuOpened} />
        </Box>
      )
    );
  }
}

export default connect(state => ({
  searchOpened: isSearchOpened(state),
}))(Header);
