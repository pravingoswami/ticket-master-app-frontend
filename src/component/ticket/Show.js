import React from 'react'
import {Container, Media, Button} from 'reactstrap'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class TicketShow extends React.Component{
    constructor(){
        super()
        this.state = {
            image : {},
            ticket : {},
            employee : [],
            department : {},
            customer : {}
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
                
                axios.get(`/customers/${ticket.customer}`, {
                    headers : {
                        'x-auth' : localStorage.getItem('authToken')
                    }
                })
                .then(response => {
                    const customer = response.data
                    console.log(customer)
                    this.setState ({customer})
                })

                
                axios.get(`/departments/${ticket.department}`, {
                    headers : {
                        'x-auth' : localStorage.getItem('authToken')
                    }
                })
                .then(response => {
                    const department = response.data
                    console.log(department)
                    this.setState ({department})
                })

                ticket.employees.map(emp => {
                    axios.get(`/employees/${emp._id}`, {
                        headers : {
                            'x-auth' : localStorage.getItem('authToken')
                        }
                    })
                    .then(response => {
                        const data = response.data
                        this.setState (prevState => ({
                            employee : prevState.employee.concat(data)
                        }))
                    })
                })

            })




            axios.get(`http://www.splashbase.co/api/v1/images/60`)
            .then(response => {
                const image = response.data
                this.setState({image})
            })
            
            .catch(err => alert(err))



    }

    render(){
        return(
            <div>
                <Container>
                    <br></br>
                    <h1 className="display-4" style = {{textAlign : "center", fontWeight : "600"}}  > Ticket Details</h1> 
                    <br></br>
                    <br></br>
                    <div>
                    <div style = {{margin : "0 auto"}} >
                        <img src = {this.state.image.url} style = {{height : "170px", width : "170px", borderRadius : "50%", float : "left", display : "bloack", marginRight : "50px"}}  ></img>
                        </div>
                        <div style = {{float : "left", display : "block"}} >
                        <h1><b>{ Object.keys(this.state.ticket).length > 0 && this.state.ticket.name} </b></h1>
                        <p><b>Code - </b>{this.state.ticket.code}</p>
                        <p><b>Customer - </b>{this.state.customer.name}</p>

                        <p><b>Department - </b>{ Object.keys(this.state.department).length > 0 && this.state.department ? this.state.department.name : `Not Available`}</p>
                         <p><b>Employees - </b>{this.state.employee.map(emp => <spna> {emp.name} {' '} </spna>)}</p>

                        <p><b>Email - </b>{this.state.customer.email}</p>
                        <p><b>Phone No. - </b>{this.state.customer.mobile}</p>
                        
                        </div>
                        <div style = {{clear : "both"}} >

                        <br></br>
                        <h4><Link to = {`/tickets/edit/${this.props.match.params.ticketId}`}>Edit ticket</Link></h4>

                        <br></br>
                        <br></br>
                        <Button color="primary" onClick = {() => this.props.history.push('/tickets')} >Back</Button>{' '}
                    </div>
                    </div>
                </Container>
            </div>
        )
    }
}

export default TicketShow


