import { Chart } from "react-google-charts";
import React from "react";
import { render } from "react-dom";
import axios from '../../config/axios'
 
class PieChart2 extends React.Component{
  constructor(){
    super()
    this.state = {
        completed : 0,
        notCompleted : 0,
      options : {
        title: 'Tickets Status',
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
        console.log(tickets)
        let completed = 0, notCompleted = 0
        tickets.map(ele => {
          if(ele.isResolved){
            completed = completed + 1
          } else{
            notCompleted = notCompleted + 1
          }
        })
        console.log(completed, notCompleted)
        this.setState({completed, notCompleted})
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
            ['Priority', 'As Per Request',  { role: 'style' }],
            ['Completed', this.state.completed, '#28a745'],
            ['Not Completed', this.state.notCompleted, '#dc3545'],  
          ]}
          options={this.state.options}
    />
    );
  }
};
 

export default PieChart2
