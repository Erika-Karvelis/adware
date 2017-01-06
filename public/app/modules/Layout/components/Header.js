// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppBar, Navigation, Link, Button } from 'react-toolbox';
// import { Link } from 'react-router';

// https://github.com/webpack/webpack/issues/1788
// stupid webpack issue on circular dependency
import { authSignoutRequest } from '../../Auth/redux/actions';

// @TODO implement logo, user profile page link

export class Header extends Component {
  render() {
    const { user, logout } = this.props;
    const isLoggedIn = user && user.token;

    if (isLoggedIn) {
      return (
        <AppBar title="Ad Ninja">
          <Navigation horizontal>
            <Link href="/#/profile" label={`Hello ${user.firstName}`} />
            <Button label="Log out" onClick={ logout } icon="exit_to_app" />
          </Navigation>
        </AppBar>
      );
    }

    return (
      <AppBar title="Ad Ninja">
        <Navigation horizontal>
          <Link href="/#/login" label="Log In" icon="exit_to_app" />
        </Navigation>
      </AppBar>
    );
  }
}

const mapStatesToProps = ({ auth: { user } }) => ({
  user
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(authSignoutRequest()),
});

export default connect(mapStatesToProps, mapDispatchToProps)(Header);
