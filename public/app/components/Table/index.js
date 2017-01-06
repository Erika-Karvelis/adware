import React, { Component } from 'react';
import { Table, ProgressBar } from 'react-toolbox';

import HeadingCell from './HeadingCell';
import Pagination from './Pagination';
import styles from '../../styles';

export default class CustomTable extends Component {
  state = {
    loading: false,
    source: [],
    total: 0
  }

  componentDidMount() {
    this.loadData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reload && nextProps.reload !== this.props.reload) {
      this.loadData();
    }
  }

  onSort = (field, sort) => {
    if (sort) {
      this.sorts[field] = sort;
    } else {
      delete this.sorts[field];
    }
    console.log(`Sort table ${field}, ${sort}`);
    this.loadData();
  }

  onPagination = (offset, pageLimit) => {
    this.offset = offset;
    this.pageLimit = pageLimit;
    console.log(`Table Offset ${offset}, pageLimit ${pageLimit}`);
    this.loadData();
  }

  sorts = {}
  offset = 0
  pageLimit = 10

  loadData = () => {
    const { onUpdate } = this.props;
    const sorts = Object.keys(this.sorts).map(key => [key, this.sorts[key]]);
    const { offset, pageLimit } = this;
    this.setState({
      loading: true,
      source: []
    });

    onUpdate({ offset, pageLimit, sorts })
    .then((data) => {
      this.setState({
        loading: false,
        source: data.rows,
        total: data.count
      });
    })
    .catch(() => {
      this.setState({
        loading: false
      });
    });
  }

  render() {
    const { model, ...props } = this.props;
    const { source, loading, total } = this.state;

    // extend model for sortable column
    const extendedModel = {};
    Object.keys(model).forEach((key) => {
      const item = model[key];
      extendedModel[key] = {
        ...item,
        title: (<HeadingCell field={ key } title={ item.title || key } sortable={ item.sortable } onClick={ this.onSort } />)
      };
    });

    return (
      <div>
        <Table { ...props } model={ extendedModel } source={ source } />
        {
          loading ? (<ProgressBar className={styles['c-block']} mode="indeterminate" multicolor />) : null
        }
        <Pagination onChange={ this.onPagination } total={total} />
      </div>
    );
  }
}
