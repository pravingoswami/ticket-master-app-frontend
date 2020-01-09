import React from 'react'
import { Container } from 'reactstrap'
import TicketForm from './Form'
import axios from '../../config/axios'

class TicketEdit extends React.Component {
    constructor(){
        super()
        this.state = {
            ticket : {}
        }
    }

    componentDidMount = () => {
        const id = this.props.match.params.ticketId
        console.log(id)

        axios.get(`/tickets/${id}`, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const ticket = response.data
            console.log(ticket)
            this.setState ({ticket})
        })
    }

    handleSubmit = (formData) => {
        axios.put(`/tickets/${this.props.match.params.ticketId}`, formData , {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })

            .then(response => {
                console.log(response.data)
                this.props.history.push(`/tickets/${this.props.match.params.ticketId}`)
            })
    }

    render(){
        return(
            <div>
                <Container>
                    <br></br>
                <h1 className="display-4" style = {{textAlign : "center", fontWeight : "600"}}  > Edit ticket</h1> 

                <br></br>

                {
                    Object.keys(this.state.ticket).length > 0 && <TicketForm
                    code = {this.state.ticket.code}
                    customer = {this.state.ticket.customer}
                    employees = {this.state.ticket.employees}
                    department = {this.state.ticket.department ? this.state.ticket.department.name : ``}
                    message = {this.state.ticket.message}
                    priority = {this.state.ticket.priority}
                    handleSubmit = {this.handleSubmit} />
                }

                </Container>
            </div>
        )
    }
}

export default TicketEdit
