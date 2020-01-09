import React from 'react'
import {Button, Input, } from 'reactstrap'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'
import Employee from './Employee'


class Data extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            customer : {},
            department : {},
            employees : [],
            isResolved : props.list.isResolved
        }
    }



    componentDidMount = () => {
        // console.log(this.props.list.customer)
        axios.get(`/customers/${this.props.list.customer}`, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const customer = response.data
            this.setState ({customer})
        })

        axios.get(`/departments/${this.props.list.department}`, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const department = response.data
            this.setState ({department})
        })

        .catch(err => alert(err))

        axios.get(`/employees`, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const employees = response.data
            // console.log(employees)
            
            this.setState ({employees})
        })

        .catch(err => alert(err))

    }

    handleToggle = () => {


        this.props.list.isResolved = !this.props.list.isResolved
        console.log(this.props.list.isResolved)
        this.setState(prevState => ({
            isResolved : !prevState.isResolved
        }))
        const formData = this.props.list
        console.log(` data -- ${this.props.list}`)

        axios.put(`/tickets/${this.props.list._id}`, formData, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
            // .then(response => {
            //     this.props.history.push('/tickets')
            // })

            .catch(err => alert(err))
    }




    render(){
        return(
                    <tr>
                    <td>{this.props.list.code}</td>
                    {/* <td>{this.state.customer.name}</td>
                    <td>{this.state.department.name}</td> */}
                    <td>{this.state.customer.name}</td>
                    <td>{this.state.department.name}</td>
                    {/* <Employee emp = {this.props.list.employees} /> */}
                    <td>{}</td>
                    {/* <td style = {{width : "50px"}} >{this.props.list.employees.map(emp => emp._id)}</td> */}
                    <td>{this.props.list.message}</td>
                    <td>{this.props.list.priority}</td>
                    <td><Button color="info" style= {{width : "110px"}} ><Link 
                        to = {`/tickets/${this.props.list._id}`}
                        style = {{color : "white"}} 
                    >Show Detail</Link></Button>{' '}</td>
                    <td><Button color="danger" onClick = {() => this.props.handleRemove(this.props.list._id)} >Remove</Button>{' '}</td>
                    
                    <td style = {{textAlign : "center"}} ><Input type="checkbox" onChange = {this.handleToggle} value = {this.props.list.isResolved} checked = {this.state.isResolved}  />{' '}</td>

                    <td>{this.props.list.isResolved ? 'Completed' : 'Not Completed'}</td>
                    </tr>
        )
    }
}

export default Data