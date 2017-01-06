import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'react-toolbox';
import { push } from 'react-router-redux';

import { userEditRequest, userGetRequest } from '../redux/actions';

export class UserEditForm extends Component {
  state = {
    username: '',
    password: '',
    name: '',
    email: '',
    description: ''
  }

  componentWillMount() {
    const { userId, get } = this.props;
    get(userId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialValues) {
      Object.keys(nextProps.initialValues).forEach((key) => {
        if (nextProps.initialValues[key] && nextProps.initialValues[key] !== this.props.initialValues[key]) {
          this.setState({
            [key]: nextProps.initialValues[key]
          });
        }
      });
    }
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { userId, edit } = this.props;
    edit(userId, this.state);
  }

  goToList = (evt) => {
    evt.preventDefault();
    const { goBack } = this.props;
    goBack();
  }

  render() {
    const { username, password, email, name, description } = this.state;
    const { handleChange, handleSubmit, goToList } = this;
    return (
      <form onSubmit={handleSubmit}>
        <Input type="text" value={username} onChange={handleChange.bind(this, 'username')} required label="Username" />
        <Input type="password" value={password} onChange={handleChange.bind(this, 'password')} label="Password" />
        <Input type="email" value={email} onChange={handleChange.bind(this, 'email')} required label="Email" />
        <Input type="text" value={name} onChange={handleChange.bind(this, 'name')} required label="Name" />
        <Input type="text" value={description} onChange={handleChange.bind(this, 'description')} multiline label="Description" />
        <Button label="Update" primary raised /> &nbsp;
        <Button label="Cancel" onClick={goToList} raised />
      </form>
    );
  }
}

const mapStateToProps = ({ user: { user } }) => ({
  initialValues: user || {}
});

const mapDispatchToProps = (dispatch) => ({
  edit: (id, userData) => {
    dispatch(userEditRequest(id, userData));
  },
  get: (id) => (dispatch(userGetRequest(id))),
  goBack: () => dispatch(push('/'))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserEditForm);
