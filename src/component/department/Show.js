import React from 'react'
import {Container, Button} from 'reactstrap'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class DepartmentShow extends React.Component{
    constructor(){
        super()
        this.state = {
            department : {}
        }
    }

    componentDidMount = () => {
        const id = this.props.match.params.departmentId
        console.log(id)
        axios.get(`/departments/${id}`,{
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })

        .then(response => {
            console.log(response.data)
            const department = response.data
            this.setState({department})
        })
    }

    render(){
        return(
            <div>
                <Container> 
                    <br></br>
                    <h1 className="display-4" style = {{textAlign : "center", fontWeight : "600"}}  > Department Details</h1> 
                    <br></br>
                    <h2><b>Name - </b>{this.state.department.name}</h2>
                    <br></br>
                    <br></br>
                    <h4><Link to = {`/departments/edit/${this.props.match.params.departmentId}`}>Edit Department</Link></h4>
                    <br></br>
                        <br></br>
                        <Button color="primary" onClick = {() => this.props.history.push('/departments')} >Back</Button>{' '}
                </Container>
            </div>
        )
    }
}

export default DepartmentShow