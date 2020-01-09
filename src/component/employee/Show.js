import React from 'react'
import {Container, Media, Button} from 'reactstrap'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class EmployeeShow extends React.Component{
    constructor(){
        super()
        this.state = {
            image : {},
            employee : {}
        }
    }

    componentDidMount = () => {
            const id = this.props.match.params.employeeId
            console.log(id)

            axios.get(`/employees/${id}`, {
                headers : {
                    'x-auth' : localStorage.getItem('authToken')
                }
            })
            .then(response => {
                const employee = response.data
                console.log(employee)
                this.setState ({employee})
            })

            axios.get(`http://www.splashbase.co/api/v1/images/10`)
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
                    <h1 className="display-4" style = {{textAlign : "center", fontWeight : "600"}}  > Employee Details</h1> 
                    <br></br>
                    <br></br>
                    <div>
                    <div style = {{margin : "0 auto"}} >
                        <img src = {this.state.image.url} style = {{height : "170px", width : "170px", borderRadius : "50%", float : "left", display : "bloack", marginRight : "50px"}}  ></img>
                        </div>
                        <div style = {{float : "left", display : "block"}} >
                        <h1><b>{ Object.keys(this.state.employee).length > 0 && this.state.employee.name} </b></h1>
                        <p><b>Department - </b>{ Object.keys(this.state.employee).length > 0 && this.state.employee.department ? this.state.employee.department.name : `Not Available`}</p>
                        <p><b>Email - </b>{this.state.employee.email}</p>
                        <p><b>Phone No. - </b>{this.state.employee.mobile}</p>
                        </div>
                        <div style = {{clear : "both"}} >

                        <br></br>
                        <h4><Link to = {`/employees/edit/${this.props.match.params.employeeId}`}>Edit Employee</Link></h4>

                        <br></br>
                        <br></br>
                        <Button color="primary" onClick = {() => this.props.history.push('/employees')} >Back</Button>{' '}
                    </div>
                    </div>
                </Container>
            </div>
        )
    }
}

export default EmployeeShow


