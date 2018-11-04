import classes from 'classnames';
import { Box } from 'grommet';
import React, { PureComponent } from 'react';
import Burger from './Burger';
import logo from './logo.png';
import Menu from './Menu';
import st from './style.module.scss';

export default class Header extends PureComponent {
  state = {
    menuOpened: false,
  };

  toggleMenu = () => {
    if (this.state.menuOpened) {
      this.setState({ menuOpened: false });
    } else {
      this.setState({ menuOpened: true });
    }
  };

  render() {
    const { menuOpened } = this.state;
    return (
      <Box align="center" direction="row" justify="between" height="60px" tag="header">
        <Burger menuOpened={menuOpened} onClick={this.toggleMenu} />
        <img src={logo} alt="logo" />
        <Menu opened={menuOpened} />
      </Box>
    );
  }
}
