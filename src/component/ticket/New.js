import React from 'react'
import { Container } from 'reactstrap'
import axios from '../../config/axios'
import TicketForm from './Form'


class TicketNew extends React.Component {
    constructor(){
        super()
        this.state = {
            
        }
    }

    
    handleSubmit = (formData) => {
        axios.post('/tickets', formData, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })

        .then(response => {
            if(response.data.hasOwnProperty('errors')) {
                alert(response.data.message)
            } else {
                this.props.history.push('/tickets')
            }
        })
    }


    render(){
        return(
            <div>
                <Container>
                <br></br>
                <h1 className="display-4" style = {{textAlign : "center", fontWeight : "600"}}  > Add New Ticket</h1> 



            <br></br>
            <TicketForm handleSubmit = {this.handleSubmit} />
            
            </Container>
            </div>
        )
    }
}

export default TicketNew