import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import universal from 'react-universal-component';

const UniversalComponent = universal(({ page }) => import(`../${page}`), {
  chunkName: props => props.page,
  minDelay: 500,
  timeout: 1000,
});

function Switcher({ page }) {
  return <UniversalComponent page={page} />;
}

Switcher.propTypes = {
  page: PropTypes.string,
};

Switcher.defaultProps = {
  page: '../Events/Page/List',
};

export default connect(state => ({
  page: state.ui.page,
}))(Switcher);
