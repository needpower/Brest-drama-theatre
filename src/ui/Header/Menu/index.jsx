import { Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Navigation from './Navigation';

export default class Menu extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    opened: PropTypes.bool,
  };

  static defaultProps = {
    onClick: null,
    opened: false,
  };

  menuRoot = document.getElementById('root');

  el = document.createElement('div');

  componentDidMount() {
    this.menuRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.menuRoot.removeChild(this.el);
  }

  render() {
    const { onClick, opened } = this.props;
    const Nav = (
      <Grommet theme={grommet}>
        <Navigation onClick={onClick} opened={opened} />
      </Grommet>
    );
    return ReactDOM.createPortal(Nav, this.el);
  }
}
