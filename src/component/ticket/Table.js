import React from 'react'
import {Table, Button, Input} from 'reactstrap'
import axios from '../../config/axios'

import Data from './Data'

class TableDetails extends React.Component {
    constructor(){
        super()
        this.state = {
            customer : {},
            department : {},
            employees : {}
        }
    }


    // componentDidMount = () => {
    //     console.log(this.props.list.customer)
    //     axios.get(`/customers/${this.props.list.customer}`, {
    //         headers : {
    //             'x-auth' : localStorage.getItem('authToken')
    //         }
    //     })
    //     .then(response => {
    //         const customer = response.data
    //         this.setState ({customer})
    //     })

    //     axios.get(`/departments/${this.props.list.department}`, {
    //         headers : {
    //             'x-auth' : localStorage.getItem('authToken')
    //         }
    //     })
    //     .then(response => {
    //         const department = response.data
    //         this.setState ({department})
    //     })

    //     .catch(err => alert(err))

    // }

    // handleData = (data) => {
    //             // console.log(this.props.list.customer)
    //     axios.get(`/customers/${data.customer}`, {
    //         headers : {
    //             'x-auth' : localStorage.getItem('authToken')
    //         }
    //     })
    //     .then(response => {
    //         const customer = response.data
    //         console.log(customer)
    //         this.setState ({customer})
    //     })

    //     axios.get(`/departments/${data.department}`, {
    //         headers : {
    //             'x-auth' : localStorage.getItem('authToken')
    //         }
    //     })
    //     .then(response => {
    //         const department = response.data
    //         console.log(department)
    //         this.setState ({department})
    //     })

    // }

    render(){
        return(
            <div>{console.log(this.props.list.customer)}
                <Table dark striped>
                    <thead>
                        <tr>
                        <th>Code No.</th>
                        <th>Customer</th>
                        <th>Department</th>
                        <th>Employees</th>
                        <th>Message</th>
                        <th>Priority</th>
                        <th>Actions</th>
                        <th>Remove</th>
                        <th>Status</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>{console.log(this.props.list)}
                        {
                            this.props.list.map((list, i) => {
                                i = i+1


                                return(
                                    <Data list = {list}  handleRemove = {this.props.handleRemove} /> 

                                )
                            })
                        }

                    </tbody>
                    </Table>
            </div>
        )
    }
}

export default TableDetails