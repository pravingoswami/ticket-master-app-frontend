import React from 'react'
import { Container } from 'reactstrap'
import EmployeeList from './List'
import EmployeeForm from './Form'
import axios from '../../config/axios'


class EmployeeNew extends React.Component{
    constructor(){
        super()
        this.state = {

        }
    }

    handleSubmit = (formData) => {
        axios.post('/employees', formData, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })

        .then(response => {
            if(response.data.hasOwnProperty('errors')) {
                alert(response.data.message)
            } else {
                this.props.history.push('/employees')
            }
        })
    }


    render(){
        return(
            <div>
            <Container>
                <br></br>
                <h1 className="display-4" style = {{textAlign : "center", fontWeight : "600"}}  > Add New Employee</h1> 



            <br></br>
            <EmployeeForm handleSubmit = {this.handleSubmit} />
            
            </Container>
            </div>
        )
    }
}


export default EmployeeNew