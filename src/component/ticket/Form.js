import React from 'react'
import {Container, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap'
import axios from '../../config/axios'


class TicketForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            customers : [],
            emp : [],
            dept : [],
            code : props.code ? props.code :'',
            customer : props.customer ? props.customer :'',
            department : props.department ? props.department :'',
            employees : props.employees ? props.employees : [],
            message : props.message ? props.message : '',
            priorities : ['High', 'Medium', 'Low'],
            priority : props.priority ? props.priority : ''
            
        }
    }


    componentDidMount = () => {
        axios.get('/customers', {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })

        .then(response => {
            const customers = response.data
            this.setState({customers})
        })

        axios.get('/departments', {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })

        .then(response => {
            const dept = response.data
            this.setState({dept})
        })

    }

    handleCustomerChange = (e) => {
        // console.log(e.target.value)
        this.setState({
            customer : e.target.value
        })
    }




    handleDepartmentChange = (e) => {
        const value = e.target.value
        
        this.setState(prevState => ({
            department : value
        }))

        axios.get('/employees', {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })

        .then(response => {
            let emp = response.data
            console.log(emp)
            emp = emp.filter(emp => emp.department != null)
            emp = emp.filter(emp => emp.department._id == value)
            console.log(emp)
            
            
            this.setState({emp})
        })

    }


    handleForm = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }


    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            code : this.state.code,
            customer : this.state.customer,
            department : this.state.department,
            employees : this.state.employees,
            message : this.state.message,
            priority : this.state.priority,
        }

        this.props.handleSubmit(formData)
    }

    handleEmployeeChange = (e) => {
        const value = e.target.value
        const data = {
            _id : value
        }
        console.log(data)
        this.setState(prevState => ({
            employees : prevState.employees.concat(data)
        }), () => console.log(this.state.employees))
    }

    handleRadio = (e) => {
        this.setState({
            priority : e.target.value
        })
    }

    render(){
        return(
            <div>
                 <Form onSubmit = {this.handleSubmit} >{console.log(this.state.employee)}
                        <Label htmlFor="code">Code</Label>
                        <Input type="text" name="code" id="code" onChange = {this.handleForm} value = {this.state.code} placeholder = "Enter your code" />

                        <br></br>
                        {/* {console.log(this.state.dept)} */}

                        <Label for="customer">Customer</Label>
                        <Input type="select" name="customer" id="customer" onChange = {this.handleCustomerChange}>
                        <option>Select</option>
                        {
                            this.state.customers.map(customer => {
                                return(
                                <option value = {customer._id} >{customer.name}</option>
                                )
                            })
                        }
                        </Input>

                        <br></br>

                        <Label for="department">Department</Label>
                        <Input type="select" name="department" id="department" onChange = {this.handleDepartmentChange}>
                        <option>Select</option>
                        {
                            this.state.dept.map(dept => {
                                return(
                                <option value = {dept._id} >{dept.name}</option>
                                )
                            })
                        }
                        </Input>

                        
                        <br></br>

                        <Label for="employees">Employees</Label>
                        <Input type="select" name="employees" id="employees" onChange = {this.handleEmployeeChange} >
                        <option>Select</option>
                        {
                            this.state.emp.map(emp => {
                                return(
                                <option value = {emp._id} >{emp.name}</option>
                                )
                            })
                        }
                        </Input>
                        <br></br>


                        <Label for="message">Message</Label>
                        <Input type="textarea" name="message" id="message" placeholder = "Enter your Message"  value = {this.state.message} onChange = {this.handleForm} />

                        <br></br>

                        <legend>Priority</legend>
                        <FormGroup check>
                        {
                            this.state.priorities.map(select => {
                                return(
                                    <Label check>
                                    <Input type="radio" name="radio1" checked = {this.state.priority != '' && true} value = {select} onChange = {this.handleRadio} />{' '}
                                    {select} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </Label>
                                )
                            })
                        }
                        </FormGroup>
                        <br></br>
                        <br></br>




                        <Button color="primary" type = "submit">Submit</Button>{' '}

                        </Form>
            </div>
        )
    }
}

export default TicketForm