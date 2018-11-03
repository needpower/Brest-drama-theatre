import React, { PureComponent } from 'react';
import classes from 'classnames';
import logo from './logo.png';
import Burger from './Burger';
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
    const menuTrigger = classes(st.menuTrigger, {
      [st.open]: menuOpened,
    });
    return (
      <header className={st.header}>
        <Burger menuOpened={menuOpened} onClick={this.toggleMenu} />
        <img src={logo} alt="logo" />
        <Menu opened={menuOpened} />
      </header>
    );
  }
}
