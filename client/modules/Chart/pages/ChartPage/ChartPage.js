import React, {Component} from 'react';
import Highcharts from 'highcharts';
import { connect } from 'react-redux';
import { getChartDataRequest} from '../../ChartActions';
import { chartData } from '../../ChartReducer';


class Chart extends Component {
  componentDidMount() {
    this.chart = new Highcharts[this.props.type || "Chart"](
      this.refs.chart,
      this.props.options
    );
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return (
        <div ref="chart"></div>
    )
  }
}

class ChartPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showChart: false,
      chartData: ''
    }
  }

  componentDidMount() {
    this.props.dispatch(getChartDataRequest()).then(res => this.setData(res));
  }

  setData(res) {
    if(res.data && res.data[0] && res.data[0].chartData) {
      this.setState({
        showChart: true,
        chartData: res.data[0].chartData
      });
    }
  }

  render() {

    if(this.state.showChart) {
      var options = {
        title: {
          text: 'User Data'
        },

        yAxis: {
          title: {
              text: 'Score'
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
        },

        series: this.state.chartData

      };
    }

    return (
      <div>
      {
        this.state.showChart == true
        ?
        <Chart container={'chart'} options={options} />
        : <p>No data yet!..</p>
      }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    chartData: chartData(state),
  };
}

export default connect(mapStateToProps)(ChartPage);