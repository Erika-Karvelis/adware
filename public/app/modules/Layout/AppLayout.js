// @flow
import React, { Component } from 'react';
import { Layout, Panel, ProgressBar } from 'react-toolbox';
import { push } from 'react-router-redux';
import classnames from 'classnames';
import { connect } from 'react-redux';

import Header from './components/Header';
import Notification from './components/Notification';
import styles from '../../styles';
import { showNotification } from './redux/actions';

const AppLayoutStyles = require('./styles/AppLayout.scss');

class AppLayout extends Component {
  static displayName = 'AppLayout';

  componentWillReceiveProps(nextProps) {
    if (nextProps.loaded && nextProps.location.pathname.indexOf('/login') === -1 && !nextProps.user) {
      this.props.goToLogin();
      this.props.showNotification('error', 'You are not logged in');
    }
  }

  render() {
    const { children, loaded, location: { pathname }, user } = this.props;
    const loading = !loaded || (pathname.indexOf('/login') === -1 && !user);

    const className = classnames(styles['c-container'], styles['c-container__center'], styles['c-container__large-padding']);
    return (
      <div className={ AppLayoutStyles.layout }>
        <Header />
        <Layout>
          <Panel scrollY>
            <div>
              <div className={ className }>
                { !loading ? children : (<ProgressBar mode="indeterminate" type="circular" multicolor />) }
              </div>
            </div>
          </Panel>
        </Layout>
        <Notification />
      </div>
    );
  }
}

const mapStatesToProps = ({ persist: { loaded }, auth: { user } }) => ({
  loaded,
  user
});

const mapDispatchToProps = (dispatch) => ({
  goToLogin: () => dispatch(push('/login')),
  showNotification: (...args) => dispatch(showNotification(...args))
});

export default connect(mapStatesToProps, mapDispatchToProps)(AppLayout);
