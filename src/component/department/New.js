import React from 'react'
import {Button} from 'reactstrap'

class DepartmentNew extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name : props.name ? props.name : ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name : this.state.name
        }

        this.props.handleSubmit(formData)

        this.setState({name : ''})

    }

    handleChange = (e) => {
        this.setState ({
            [e.target.name] : e.target.value
        })
    }

    render(){
        return(
            <div>

                    <form onSubmit = {this.handleSubmit} >
                    <h3 htmlFor = "name">Add Department</h3>
                    <input type = "text" value = {this.state.name} onChange = {this.handleChange} name = "name" id = "name" />
                    <br></br>
                    <br></br>
                    <Button color="primary" type = "submit">Submit</Button>{' '}
                    </form>
            </div>
        )
    }
}

export default DepartmentNew