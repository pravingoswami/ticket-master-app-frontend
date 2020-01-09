import React from 'react'
import {Container, Button, Form, FormGroup, Label, Input, FormText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import axios from '../../config/axios'



class EmployeeForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name : props.name ? props.name : '',
            email : props.email ? props.email : '',
            mobile : props.mobile ? props.mobile : '',
            dept : [],
            department : props.department ? props.department : ''
        }
    }

    componentDidMount = () => {
        axios.get('/departments', {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })

        .then(response => {
            // console.log(response.data)
            const dept = response.data
            this.setState({dept})
        })
        .catch(err => alert(err))

    }

    handleSubmit = (e) => {
        console.log('hi')
        e.preventDefault()
        const formData = {
            name : this.state.name,
            email : this.state.email,
            mobile : this.state.mobile,
            department : this.state.department
        }

        this.props.handleSubmit(formData)
    }

    handleChange = (e) => {
        this.setState ({
            [e.target.name] : e.target.value
        })
    }

    handleDropdown = (e) => {
        this.setState({
            department : e.target.value
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

                        {/* <Label>Department</Label>
                        <br></br>
                        <select onChange = {this.handleDropdown} >
                            <option>Select</option>
                            {
                                this.state.dept.map(dept => {
                                    return(
                                        <option value = {dept._id} >{dept.name}</option>
                                    )
                                })
                            }
                        </select> */}

                        <Label for="department">Department</Label>
                        <Input type="select" name="department" id="department" onChange = {this.handleDropdown}>
                        <option>{this.state.department != '' ?  this.state.department : `Select`}</option>
                        {
                            this.state.dept.map(dept => {
                                return(
                                <option value = {dept._id} >{dept.name}</option>
                                )
                            })
                        }
                        </Input>

                        

                        <br></br>
                        <br></br>

                        <Button color="primary" type = "submit">Submit</Button>{' '}

                        </Form>
            </div>
        )
    }
}

export default EmployeeForm