import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Navigation from './Navigation';

export default class Menu extends Component {
  static propTypes = {
    opened: PropTypes.bool,
  };

  static defaultProps = {
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
    const { opened } = this.props;
    return ReactDOM.createPortal(<Navigation opened={opened} />, this.el);
  }
}
