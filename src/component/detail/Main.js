import { Chart } from "react-google-charts";
import * as React from "react";
import { render } from "react-dom";
 
class PieChart extends React.Component{
  constructor(){
    super()
    this.state = {
      data : [
                ['Task', 'Hours per Day'],
                ['Work', 11],
                ['Eat', 2],
                ['Commute', 2],
                ['Watch TV', 2],
                ['Sleep', 7],
              ],
      options : {
        title: 'My Daily Activities',
      }
    }
  }

  render() {
    return (
      <Chart
      width={'700px'}
      height={'500px'}
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={this.state.data}
      options={this.state.options}
    />
    );
  }
};
 

export default PieChart
