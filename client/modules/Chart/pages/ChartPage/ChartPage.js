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




      //     chart: {
      //   type: 'column'
      // },  

      // title: {
      //   text: 'Questionnaire',
      //   style: {
      //   "color": "#96281B",
      //   "fontSize": "26px"
      //   }
      // },

      // xAxis: {
      //   type: 'category',
      //   // categories: mySeries
      // },

      // yAxis: {
      //   min: 0,
      //   max: 100,
      //   title: {
      //     text: 'Total percent marks'
      //   }
      // },

      // credits: {
      //   enabled: false
      // },

      // tooltip: {
      //   headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      //   pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.1f}% aggregate</b><br/>'
      // },

      // plotOptions: {
      //   series: {
      //     borderWidth: 0,
      //     dataLabels: {
      //       enabled: true,
      //       format: '{point.y:.1f}%'
      //     },
      //     animation: {
      //       duration: 1000
      //     }
      //   }
      // },

      // series: [{
      //   name: "Marks",
      //   colorByPoint: true,
      //   data: [{
      //     name : 'lala',
      //     y : 30
      //   },{
      //     name : 'jkdsfks',
      //     y : 60
      //   },{
      //     name : 'ladjkfnkla',
      //     y : 90
      //   }]
      // }],

      // [{
      //     name: 'Installation',
      //     data: [{x: 20, y: 4934},{x: 22, y: 41934}, {x: 24, y: 459000}]
      // }, {
      //     name: 'Manufacturing',
      //     data: [{x: 20, y: 1934},{x: 22, y: 21934}, {x: 24, y: 359000}]
      // }]