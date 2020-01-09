import React from 'react'
import axios from '../../config/axios'
import {Container, Table, Button, Form , Label , Input} from 'reactstrap'
import {Link} from 'react-router-dom'
import PieChart from './PieChart'
import PieChart2 from './CompletedPieChart'
import BarChart from './BarChart'

import TableDetails from './Table'

class TicketList extends React.Component{
    constructor(){
        super()
        this.state = {
            tickets : []
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
            this.setState ({tickets})
        })
    }

    
    handleRemove = (id) => {
        axios.delete(`/tickets/${id}`, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })

            .then(response => {
                this.setState(prevState => ({
                    employees : prevState.tickets.filter(ticket => ticket._id != id)
                }))
            })
            .catch(err => alert(err))

            window.location.reload()

    }


    render(){
        return(
            <div>
                            <Container>
                                <br></br>
                            <h1 className="display-4" style = {{textAlign : "center", fontWeight : "600"}}  > Tickets Details</h1> 

                             <h3><Link to = "/tickets/new">Add Ticket</Link></h3>

                            <br></br>


            <TableDetails list = {this.state.tickets}  handleRemove = {this.handleRemove} />

            <br></br>
            <PieChart2 tickets = {this.state.tickets} />
            <PieChart tickets = {this.state.tickets} />
            <BarChart tickets = {this.state.tickets} />

            </Container>
            </div>
        )
    }
}

export default TicketList