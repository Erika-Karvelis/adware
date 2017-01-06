import React from 'react';
import { connect } from 'react-redux';
import { ProgressBar } from 'react-toolbox';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { adAnalyticsRequest } from '../Ad/redux/actions';

class AdChart extends React.Component {
  componentWillMount() {
    this.props.loadAnaytics();
  }

  render() {
    const { analytics, analyticsLoading } = this.props;
    if (analyticsLoading) {
      return (
        <ProgressBar mode="indeterminate" type="circular" multicolor />
      );
    }

    return (
      <BarChart width={ 600 } height={400} data={ analytics } layout="vertical">
        <XAxis type="number" />
        <YAxis type="category" dataKey="Name" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Bar type="monotone" dataKey="clickCount" fill="#8884d8" />
      </BarChart>
    );
  }
}

const mapStatesToProps = ({ ad: { analytics, analyticsLoading } }) => ({
  analytics,
  analyticsLoading
});
const mapDispatchToProps = (dispatch) => ({
  loadAnaytics: () => dispatch(adAnalyticsRequest())
});

export default connect(mapStatesToProps, mapDispatchToProps)(AdChart);
