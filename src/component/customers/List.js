import React from 'react'
import axios from '../../config/axios'

import {Link} from 'react-router-dom'
import { Container } from 'reactstrap'

import TableDetails from './Table'

import CustomerNew from './New'

class CustomerList extends React.Component{
    constructor(){
        super()
        this.state = {
            customers : [],
            header : {
                name : "Name",
                email : "Email",
                mobile : "Mobile"
            }
        }
    }


    componentDidMount = () => {
        axios.get('/customers', {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const customers = response.data
            this.setState ({customers})
        })
    }

    handleRemove = (id) => {
        axios.delete(`/customers/${id}`, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })

            .then(response => {
                this.setState(prevState => ({
                    customers : prevState.customers.filter(customer => customer._id != id)
                }))
            })

    }



    render(){
        return(
            <Container>
                <br></br>
    <h1 className="display-4" style = {{textAlign : "center", fontWeight : "600"}}  > Listing Customers - {this.state.customers.length}</h1> 

    <h3><Link to = "/customers/new">Add Customer</Link></h3>

            <br></br>
            <TableDetails header = {this.state.header} list = {this.state.customers} handleRemove = {this.handleRemove} />




            </Container>
        )
    }

}

export default CustomerList