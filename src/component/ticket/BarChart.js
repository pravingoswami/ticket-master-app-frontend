import { Chart } from "react-google-charts";
import React from "react";
import { render } from "react-dom";
import axios from '../../config/axios'
 
class PieChart extends React.Component{
  constructor(){
    super()
    this.state = {
      options : {
        title: 'Departments',
      },
      data : [
        ['Departments', 'As Per department', {role : 'annotation'}],
      ],
      departments : []

    }
  }


  componentDidMount = () => {
    axios.get('/departments', {
        headers : {
            'x-auth' : localStorage.getItem('authToken')
        }
    })
    .then(response => {
        const departments = response.data
        this.setState({departments})
        // let data1 = []
        // departments.map(dept => {
        //     const temp = [dept.name, 1, dept.name]
        //     console.log(temp)
        //     data1.push(temp)
        // })
        // this.setState(prevState => ({
        //     data : prevState.data.concat(data1)
        // }), () => {console.log(this.state.data)})
    })

    axios.get('/tickets', {
        headers : {
            'x-auth' : localStorage.getItem('authToken')
        }
    })

    .then(response => {
        const tickets = response.data
        let count = 0
        let temp1 = []
        // tickets.map(ele => {
        //     const temp = this.state.departments.find(dept => {
        //         return ele.department == dept._id
        //     })
        //     console.log(temp)
        //     if(temp){
        //         count = count + 1
        //         temp1 = temp1.concat([temp.name, count, temp.name])
        //         console.log(temp1)
        //     } else {
        //         count = 0
        //     }
        // })
        // console.log(temp1)

        
        this.state.departments.map(dept => {
            const temp = tickets.filter(ele => {
                return ele.department == dept._id
            })
            const data = [dept.name, temp.length, dept.name]
            temp1 = temp1.concat([data])
        })
        this.setState(prevState => ({
            data : prevState.data.concat(temp1)
        }))
    })



}


  render() {
    return (
      <Chart
          width={'700px'}
          height={'500px'}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={this.state.data}
          options={this.state.options}
    />
    );
  }
};
 

export default PieChart
