import React from 'react'
import { Container } from 'reactstrap'
import DepartmentNew from './New'
import axios from '../../config/axios'

class DepartmentEdit extends React.Component {
    constructor(){
        super()
        this.state = {
            department : {}
        }
    }

    componentDidMount = () => {
        const id = this.props.match.params.departmentId
        console.log(id)

        axios.get(`/departments/${id}`, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const department = response.data
            console.log(department)
            this.setState ({department})
        })
    }

    handleSubmit = (formData) => {
        axios.put(`/departments/${this.props.match.params.departmentId}`, formData , {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })

            .then(response => {
                console.log(response.data)
                this.props.history.push(`/departments/${this.props.match.params.departmentIid}`)
            })
    }

    render(){
        return(
            <div>
                <Container>
                    <br></br>
                <h1 className="display-4" style = {{textAlign : "center", fontWeight : "600"}}  > Edit Department</h1> 

                <br></br>

                {
                    Object.keys(this.state.department).length > 0 && <DepartmentNew name = {this.state.department.name} handleSubmit = {this.handleSubmit} />
                }

                </Container>
            </div>
        )
    }
}

export default DepartmentEdit