import React from 'react'
import axios from '../../config/axios'

import {Link} from 'react-router-dom'
import { Container } from 'reactstrap'

import TableDetail from './Table'


class EmployeeList extends React.Component{
    constructor(){
        super()
        this.state = {
            employees : [],
            header : {
                    name : "Name",
                    email : "Email",
                    mobile : "Mobile",
                    department : "Department"
            }
        }
    }

    componentDidMount = () => {
        axios.get('/employees', {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const employees = response.data
            console.log(employees)
            this.setState ({employees})
        })
    }
    

    handleRemove = (id) => {
        axios.delete(`/employees/${id}`, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })

            .then(response => {
                this.setState(prevState => ({
                    employees : prevState.employees.filter(emp => emp._id != id)
                }))
            })

    }



    render(){
        return(
            <div>
                <Container>
                            <br></br>
                <h1 className="display-4" style = {{textAlign : "center", fontWeight : "600"}}  > Listing Employees - {this.state.employees.length}</h1> 

                <h3><Link to = "/employees/new">Add Employee</Link></h3>

                <br></br>

                <TableDetail header = {this.state.header} list = {this.state.employees} handleRemove = {this.handleRemove} />

                </Container>

            </div>
        )
    }
}

export default EmployeeList