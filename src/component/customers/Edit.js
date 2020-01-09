import React from 'react'
import { Container } from 'reactstrap'
import CustomerForm from './Form'
import axios from '../../config/axios'

class CustomerEdit extends React.Component {
    constructor(){
        super()
        this.state = {
            customer : {}
        }
    }

    componentDidMount = () => {
        const id = this.props.match.params.id
        console.log(id)

        axios.get(`/customers/${id}`, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const customer = response.data
            console.log(customer)
            this.setState ({customer})
        })
    }

    handleSubmit = (formData) => {
        axios.put(`/customers/${this.props.match.params.id}`, formData , {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })

            .then(response => {
                console.log(response.data)
                this.props.history.push(`/customers/${this.props.match.params.id}`)
            })
    }

    render(){
        return(
            <div>
                <Container>
                    <br></br>
                <h1 className="display-4" style = {{textAlign : "center", fontWeight : "600"}}  > Edit Customer</h1> 

                <br></br>

                {
                    Object.keys(this.state.customer).length > 0 && <CustomerForm{...this.state.customer} handleSubmit = {this.handleSubmit} />
                }

                </Container>
            </div>
        )
    }
}

export default CustomerEdit