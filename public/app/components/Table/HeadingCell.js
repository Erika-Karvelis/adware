import React, { Component } from 'react';
import { Button } from 'react-toolbox';

export default class HeadingCell extends Component {
  state = {
    sort: '',
    disabled: false
  }

  componentWillMount() {
    const { sortable } = this.props;
    this.setState({
      disabled: !sortable
    });
  }

  onClick = () => {
    const valueMap = {
      '': 'DESC',
      DESC: 'ASC',
      ASC: ''
    };

    const { onClick, field } = this.props;
    if (onClick) {
      onClick(field, valueMap[this.state.sort]);
    }

    this.setState({
      sort: valueMap[this.state.sort]
    });
  }

  render() {
    const { title, sortable } = this.props;
    const { sort, disabled } = this.state;
    const icon = sort && (sort === 'ASC' ? 'arrow_upward' : 'arrow_downward');

    return (
      <Button onClick={ this.onClick } label={ title } flat disabled={ disabled } primary={ !!(sortable && sort) } icon={ icon } />
    );
  }
}
