import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import universal from 'react-universal-component';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Loading from './Loading';
import st from './style.module.scss';

const UniversalComponent = universal(({ page }) => import(`../${page}`), {
  chunkName: props => props.page,
  loading: Loading,
  minDelay: 500,
  timeout: 1000,
});

function Switcher({ page }) {
  return (
    <TransitionGroup>
      <CSSTransition
        key={page}
        timeout={500}
        classNames={{
          enter: st.fadeEnter,
          enterActive: st.fadeEnterActive,
          exit: st.fadeExit,
          exitActive: st.fadeExitActive,
        }}
      >
        <UniversalComponent page={page} />
      </CSSTransition>
    </TransitionGroup>
  );
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
