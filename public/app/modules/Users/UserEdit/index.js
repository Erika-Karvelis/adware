import React, { Component } from 'react';
import UserEditForm from './UserEditForm';
import styles from '../../../styles';

export class UserEdit extends Component {
  displayName: 'UserEdit';

  render() {
    return (
      <div className={ styles['c-container__small'] }>
        <h2>Edit User</h2>
        <UserEditForm userId={ this.props.params && this.props.params.userId } />
      </div>
    );
  }
}

export default UserEdit;
