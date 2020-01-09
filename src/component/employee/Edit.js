import React from 'react'
import { Container } from 'reactstrap'
import EmployeeForm from './Form'
import axios from '../../config/axios'

class EmployeeEdit extends React.Component {
    constructor(){
        super()
        this.state = {
            employee : {}
        }
    }

    componentDidMount = () => {
        const id = this.props.match.params.employeeId
        console.log(id)

        axios.get(`/employees/${id}`, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const employee = response.data
            console.log(employee)
            this.setState ({employee})
        })
    }

    handleSubmit = (formData) => {
        axios.put(`/employees/${this.props.match.params.employeeId}`, formData , {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })

            .then(response => {
                console.log(response.data)
                this.props.history.push(`/employees/${this.props.match.params.employeeId}`)
            })
    }

    render(){
        return(
            <div>
                <Container>
                    <br></br>
                <h1 className="display-4" style = {{textAlign : "center", fontWeight : "600"}}  > Edit Employee</h1> 

                <br></br>

                {
                    Object.keys(this.state.employee).length > 0 && <EmployeeForm
                    name = {this.state.employee.name}
                    email = {this.state.employee.email}
                    department = {this.state.employee.department ? this.state.employee.department.name : ``}
                    mobile = {this.state.employee.mobile}
                    handleSubmit = {this.handleSubmit} />
                }

                </Container>
            </div>
        )
    }
}

export default EmployeeEdit
