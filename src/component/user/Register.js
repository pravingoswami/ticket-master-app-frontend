// @ts-nocheck
import React from 'react'
import {Container, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap'
import axios from 'axios'

class Register extends React.Component{
    constructor(){
        super()
        this.state = {
            username : '',
            email : '',
            password : ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
           username : this.state.username,
           email : this.state.email,
           password : this.state.password 
        }

        axios.post('http://dct-ticket-master.herokuapp.com/users/register', formData)
            .then(response => {
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.message)
                }
                else(
                    this.props.history.push('/account/login')
                )
            })

            .catch(err => alert(err))
    }



    handleChange = (e) =>{
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
                        <Form onSubmit = {this.handleSubmit} >
                        <Label htmlFor="username">Username</Label>
                        <Input type="text" name="username" id="username" onChange = {this.handleChange} value = {this.state.username} placeholder = "Enter your username" />

                        <br></br>

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
export default Register