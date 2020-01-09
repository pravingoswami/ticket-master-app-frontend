import { Chart } from "react-google-charts";
import React from "react";
import { render } from "react-dom";
import axios from '../../config/axios'
 
class PieChart extends React.Component{
  constructor(){
    super()
    this.state = {
      high: 0,
      medium : 0,
      low : 0,
      options : {
        title: 'Tickets Priorities',
      }

    }
  }


  componentDidMount = () => {
    axios.get('/tickets', {
        headers : {
            'x-auth' : localStorage.getItem('authToken')
        }
    })
    .then(response => {
        const tickets = response.data
        let high = 0, medium = 0, low = 0
        tickets.map(ele => {
          if(ele.priority == "High"){
            high = high + 1
          } else if (ele.priority == "Medium"){
            medium = medium + 1
          } else if (ele.priority == "Low"){
            low = low + 1
          }
        })
        console.log(high, medium, low)
        this.setState({high, medium, low})
    })
    
}


  render() {
    return (
      <Chart
          width={'700px'}
          height={'500px'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['Priority', 'As Per Request'],
            ['High', this.state.high],
            ['Medium', this.state.medium],
            ['Low', this.state.low],
          ]}
          options={this.state.options}
    />
    );
  }
};
 

export default PieChart
