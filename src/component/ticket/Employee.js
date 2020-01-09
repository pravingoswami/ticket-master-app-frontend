import React from 'react'
import {Button} from 'reactstrap'
import axios from '../../config/axios'


class Data extends React.Component {
    constructor(){
        super()
        this.state = {
            employees : []
        }
    }


    componentDidMount = () => {

        console.log(this.props.emp)

        this.props.emp.map(emp => {

            axios.get(`/employees/${emp._id}`, {
                headers : {
                    'x-auth' : localStorage.getItem('authToken')
                }
            })
            .then(response => {
                const employees = response.data
                console.log(employees)
                this.setState(prevState => {
                    employees : prevState.employees.concat(employees)
                })
            })
    
            .catch(err => alert(err))
        })

    }

    render(){
        return(
        <td>{this.state.employees.map(emp => <p>{emp.name}</p>)}{console.log(this.state.employees)}</td>
        )
    }
}

export default Data