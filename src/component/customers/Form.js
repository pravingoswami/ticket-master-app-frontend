import React from 'react'
import {Container, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap'


class CustomerForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name : props.name ? props.name : '',
            email : props.email ? props.email : '',
            mobile : props.mobile ? props.mobile : ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name : this.state.name,
            email : this.state.email,
            mobile : this.state.mobile
        }

        this.props.handleSubmit(formData)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render(){
        return(
            <div>
                 <Form onSubmit = {this.handleSubmit} >
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" name="name" id="name" onChange = {this.handleChange} value = {this.state.name} placeholder = "Enter your name" />

                        <br></br>

                        <Label htmlFor="email">Email</Label>
                        <Input type="text" name="email" id="email" onChange = {this.handleChange} value = {this.state.email} placeholder = "Enter your email id" />

                        <br></br>

                        <Label htmlFor="mobile">Mobile</Label>
                        <Input type="text" name="mobile" id="mobile" onChange = {this.handleChange} value = {this.state.mobile} placeholder = "Enter your mobile number" />
                        
                        <br></br>

                        <Button color="primary" type = "submit">Submit</Button>{' '}

                        </Form>
            </div>
        )
    }
}

export default CustomerForm