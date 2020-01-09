import React from 'react'
import {Container, Media, Button} from 'reactstrap'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class CustomerShow extends React.Component{
    constructor(){
        super()
        this.state = {
            image : {},
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

            axios.get(`http://www.splashbase.co/api/v1/images/${id}`)
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
                    <h1 className="display-4" style = {{textAlign : "center", fontWeight : "600"}}  > Customer Details</h1> 
                    <br></br>
                    <br></br>
                    <div>
                    <div style = {{margin : "0 auto"}} >
                        <img src = {this.state.image.url} style = {{height : "130px", width : "130px", borderRadius : "50%", float : "left", display : "bloack", marginRight : "50px"}}  ></img>
                        </div>
                        <div style = {{float : "left", display : "block"}} >
                        <h1><b>{ Object.keys(this.state.customer).length > 0 && this.state.customer.name} </b></h1>
                        <p><b>Email - </b>{this.state.customer.email}</p>
                        <p><b>Phone No. - </b>{this.state.customer.mobile}</p>
                        </div>
                        <div style = {{clear : "both"}} >

                        <br></br>
                        <h4><Link to = {`/customers/edit/${this.props.match.params.id}`}>Edit Customer</Link></h4>

                        <br></br>
                        <br></br>
                        <Button color="primary" onClick = {() => this.props.history.push('/customers')} >Back</Button>{' '}
                    </div>
                    </div>
                </Container>
            </div>
        )
    }
}

export default CustomerShow


