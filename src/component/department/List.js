import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

import {Container, Table, Button, Form , Label , Input} from 'reactstrap'
import DepartmentNew from './New'

class DepartmentList extends React.Component{

    constructor(){
        super()
        this.state = {
            departments : []
        }
    }


    componentDidMount = () => {
        axios.get('/departments', {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const departments = response.data
                this.setState({departments})
            })

            .catch(err => alert(err))
    }

    handleSubmit = (formData) => {
        console.log("hi")
        axios.post('/departments', formData, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })

            .then(response => {
                const data = response.data
                this.setState(prevState => ({
                    departments : prevState.departments.concat(data)
                }
                ))
            })

            .catch(err => alert(err))

    }

    
    handleRemove = (id) => {
        axios.delete(`/departments/${id}`, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })

            .then(response => {
                this.setState(prevState => ({
                    departments : prevState.departments.filter(customer => customer._id != id)
                }))
            })

    }




    render(){
        return(
            <div>
                <Container>
                    <br></br>
                    <h1 className="display-4" style = {{textAlign : "center", fontWeight : "600"}}  > Listing Departments - {this.state.departments.length}</h1> 

                <br></br>
                <br></br>
                <div>

                    {
                        <Table dark striped>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Action</th>
                            <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.departments.map((dept, i) => {
                                    i = i+1
                                    return(
                                        <tr>
                                        <th scope = "row" > {i}</th>
                                        <td>{dept.name}</td>
                                        <td>
                                            <Button color="info">
                                                <Link 
                                                    to = {`/departments/${dept._id}`} 
                                                    style = {{color : "white"}}
                                                    >
                                                        Show Detail
                                                </Link>
                                            </Button>{' '}</td>
                                        <td><Button color="danger" onClick = {() => this.handleRemove(dept._id) } >Remove</Button>{' '}</td>
                                        </tr>
                                    )
                                })
                            }
    
                        </tbody>
                        </Table>
                    }

                </div>
                    
                    <br></br>
                    <br></br>


                    <DepartmentNew handleSubmit = {this.handleSubmit} />


                </Container>
            </div>
        )
    }
}

export default DepartmentList