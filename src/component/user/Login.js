// @ts-nocheck
import React from 'react'
import {Container, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap'
import axios from 'axios'

class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            email : '',
            password : ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const formData = {
            email : this.state.email,
            password : this.state.password
        }
        console.log(formData)

        axios.post('http://dct-ticket-master.herokuapp.com/users/login', formData)
            .then(response => {
                console.log(response.data)
                if(response.data.hasOwnProperty('error')){
                    alert(response.data.error)
                } else{
                    const token = response.data.token
                    localStorage.setItem('authToken',token)
                    console.log(token)
                    this.props.history.push('/')
                    window.location.reload()
                }
            })

            .catch(err => alert(err))
    }

    handleChange = (e) => {
        this.setState ({
            [e.target.name] : e.target.value
        })
    }

    render(){
        return(
            <div>
                <br></br>
                <Container>
                    <h1 className="display-4" style = {{textAlign : "center", fontWeight : "600"}}  > Register</h1> 
                    <br></br>
                    <div>
                    <Form onSubmit = {this.handleSubmit}>

                        <Label htmlFor="email">Email</Label>
                        <Input type="text" name="email" id="email" onChange = {this.handleChange} value = {this.state.email} placeholder = "Enter your email" />

                        <br></br>

                        <Label htmlFor="password">Password</Label>
                        <Input type="password" name="password" id="password" onChange = {this.handleChange} value = {this.state.password} placeholder = "Enter your password" />
                        
                        <br></br>

                        <Button color="primary" type = "submit">Submit</Button>{' '}

                        </Form>
                    </div>


                </Container>
            </div>
        )
    }
}
export default Login