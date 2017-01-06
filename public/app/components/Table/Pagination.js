import React, { Component } from 'react';
import { IconButton, Dropdown } from 'react-toolbox';

const paginationStyle = require('./styles/Pagination.scss');

export default class Pagination extends Component {
  state = {
    pageLimit: 10,
    offset: 0,
    total: 0
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.total && this.props.total !== nextProps.total) {
      this.setState({
        total: nextProps.total
      });
    }
  }

  onLeftPage = () => {
    const { offset, pageLimit } = this.state;
    const { onChange } = this.props;
    if (!offset) {
      return;
    }

    this.setState({
      offset: offset - pageLimit
    });
    onChange(offset - pageLimit, pageLimit);
  }

  onRightPage = () => {
    const { offset, pageLimit, total } = this.state;
    const { onChange } = this.props;
    if (offset + pageLimit >= total) {
      return;
    }

    this.setState({
      offset: offset + pageLimit
    });
    onChange(offset + pageLimit, pageLimit);
  }

  onPageLimitChange = (newVal) => {
    const { offset } = this.state;
    const { onChange } = this.props;
    this.setState({
      pageLimit: newVal
    });
    onChange(offset, newVal);
  }


  render() {
    const { pageLimit, offset, total } = this.state;
    const pageLimitList = [
      { value: 10, label: '10' },
      { value: 20, label: '20' },
      { value: 50, label: '50' },
    ];

    const start = offset + 1;
    const end = offset + pageLimit;

    return (
      <div className={ paginationStyle['c-pagination'] }>
        <span>Rows per page </span>
        <Dropdown value={ pageLimit } onChange={ this.onPageLimitChange } source={pageLimitList} className={ paginationStyle['c-dropdown-pagelimit'] } />
        <span>{`Displaying ${start}-${end} of ${total}`}</span>
        <IconButton icon="keyboard_arrow_left" onClick={ this.onLeftPage } />
        <IconButton icon="keyboard_arrow_right" onClick={ this.onRightPage } />
      </div>
    );
  }
}
