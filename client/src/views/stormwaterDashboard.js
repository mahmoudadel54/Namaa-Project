import React from "react";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import axios from 'axios'


// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import '../assets/css/dashboard.css'
// core components
import Donut from "../components/PieChart";
import RadialChart from "../components/RadialChart";
import SplineArea from "../components/splineArea";
import PieWithImage from "../components/pieWithImage";
import Stormwatermap from "../components/Stormwatermap";

// groutmiss_around: 1
// hole_bricks_missing: 3
// hydrogensulfide_damage: 3
// infiltration_around_barreljoints: null
// maintenance_of_hole: 2
// object_restrict_flow: 2

class Dashboard extends React.Component {

    state = {
      bigChartData: "data1",
      geojson: [],
      series: {},
      seriesStatus: {},
      performance: 0,
      chartExample3: {},
      factor1:{},
      factor2:{},
      factor3:{},
      factor4:{}
  }
  async componentDidMount(){
    await axios
    .get("http://localhost:9000/stormwater/",{})
    .then((res) => {
      console.log(res.data);
      this.setState({geojson:res.data})
      const series = this.state.geojson.map(f=> f.Overall_ra);
      console.log(series)
      const computedSeries = {};
      const seriesStatus = this.state.geojson.map(f=> f.Oper_statu);
    
    const computedSeriesStatus = {};
    for (let index = 0; index < series.length; index++) {
      let key1 = series[index];
      let key2 = seriesStatus[index];
      if(computedSeries.hasOwnProperty(key1)&&computedSeriesStatus.hasOwnProperty(key2))
      {
        computedSeries[key1] +=1;
        computedSeriesStatus[key2] +=1;
      }else {
        computedSeries[key1] = 1;
        computedSeriesStatus[key2] = 1
      }
    }
    console.log(computedSeries)
    computedSeries['1'] = 0;
    console.log(computedSeries)
    const generalCondition = this.state.geojson.map(f=> f.general_co);
    const performance = generalCondition.reduce(function(a,b){
      return a+b
    },0);
    let name = this.state.geojson.map(f=>f.asset_name)
  let performanceCondition =this.state.geojson.map(f=>f.general_co)
  const factor1 ={name: "hole bricks missing"}
  factor1.data = this.state.geojson.map(f=>f.hole_bricks_missing)
  const factor2 ={name: "object restrict flow"}
  factor2.data = this.state.geojson.map(f=>f.object_restrict_flow)
  const factor3 ={name: "groutmiss around"}
  factor3.data = this.state.geojson.map(f=>f.groutmiss_around)
  let chartExample3 = {
    data: canvas => {
      let ctx = canvas.getContext("2d");
  
      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
  
      gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
      gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
      gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors
  
      return {
        labels: name,
        datasets: [
          {
            label: "Performance",
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: "#d048b6",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: performanceCondition
          }
        ]
      };
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: "#344675",
        titleFontColor: "#e14eca",
        bodyFontColor: "#f3f3f3",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              drawBorder: true,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 100,
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: true,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ]
      }
    }
  };
        this.setState ({
      series : computedSeries,
      performance : performance/(generalCondition.length*100) * 100,
      seriesStatus : computedSeriesStatus,
      chartExample3: chartExample3,
      factor1: factor1,
      factor2 : factor2,
      factor3: factor3
    })
    })
    .catch((error) => {
      console.log(error);
    });
  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  render() {
    return (
      <div id= 'dashboard'>
          <Row>
          <Col lg="3">
          <Card >
              <CardBody>
                <Donut series= {this.state.series} />
              </CardBody>
          </Card>
          <Card >
              <CardBody>
                <RadialChart overallPerformance = {this.state.performance} />
                {/* <h4 style= {{textAlign: 'center', color: "#1E80FF",alignSelf: 'center'}}>Performance</h4> */}
              </CardBody>
              </Card>
          </Col>
          <Col lg="6">
              <Card className="card-chart" id= "map">
              <CardBody>
                <Stormwatermap style='mapbox://styles/asma163/ckbgkzh7457611io4q6k872re' token='pk.eyJ1IjoiYXNtYTE2MyIsImEiOiJja2I0MnJwMm4wYnFvMnJvNnA2NjBmdnN2In0.QVk1j8vEHjmZA0YZOyv7VA' height="44.5vh" center = {[31.636743, 30.099665]}/>
                {/* <DashboardMap style ="mapbox://styles/asma163/ckbggndq8257h1irya7l12nzw" accessToken="pk.eyJ1IjoiYXNtYTE2MyIsImEiOiJja2I0MnJwMm4wYnFvMnJvNnA2NjBmdnN2In0.QVk1j8vEHjmZA0YZOyv7VA" /> */}
              </CardBody>
              </Card>
          </Col>
          <Col lg="3">
              <Card className="card-chart">
                <CardBody>
                  <h4 style={{textAlign:'center'}}><i className="tim-icons icon-delivery-fast text-primary" />{" "}Customer Satisfaction</h4>
                  <h3 style={{textAlign:'center', color: "#e14eca"}}>69 %</h3>
                </CardBody>
              </Card>
              <Card className="card-chart">
                <CardBody>
                 <PieWithImage series={this.state.seriesStatus} />
                </CardBody>
              </Card>
          </Col>
          </Row>
          <Row>
            <Col lg= '6'>
            <Card className="card-chart" id= "map">
              <CardBody>
              <SplineArea factor1={this.state.factor1} factor2={this.state.factor2} factor3={this.state.factor3} assetName = {this.state.geojson.map(f=>f.asset_name)} />
              </CardBody>
              </Card>
            </Col>
            <Col lg= '6'>
            <Card className="card-chart">
                <CardHeader>
                  {/* <h5 className="card-category">Performance</h5> */}
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardBody>
                    <Bar
                      data={this.state.chartExample3.data}
                      options={this.state.chartExample3.options}
                    />
                </CardBody>
              </Card>
            </Col>
          </Row>
      </div>
    );
  }
}

export default Dashboard;