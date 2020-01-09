import React from 'react'
import { Container } from 'reactstrap'
import CustomerForm from './Form'
import axios from '../../config/axios'



class CustomerNew extends React.Component {
    constructor(){
        super()
        this.state = {
            
        }
    }

    
    handleSubmit = (formData) => {
        axios.post('/customers', formData, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })

        .then(response => {
            if(response.data.hasOwnProperty('errors')) {
                alert(response.data.message)
            } else {
                this.props.history.push('/customers')
            }
        })
    }


    render(){
        return(
            <div>
                <Container>
                <br></br>
                <h1 className="display-4" style = {{textAlign : "center", fontWeight : "600"}}  > Add New Customer</h1> 



            <br></br>
            <CustomerForm handleSubmit = {this.handleSubmit} />
            
            </Container>
            </div>
        )
    }
}

export default CustomerNew