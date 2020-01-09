import React from 'react'
import {Table, Button} from 'reactstrap'
import {Link} from 'react-router-dom'

class TableDetails extends React.Component {
    constructor(){
        super()
        this.state = {

        }
    }



    render(){
        return(
            <div>
                <Table dark striped>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>{this.props.header.name}</th>
                        <th>{this.props.header.email}</th>
                        <th>{this.props.header.mobile}</th>
                        <th>{this.props.header.department}</th>
                        <th>Action</th>
                        <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.list.map((list, i) => {
                                i = i+1
                                return(
                                    <tr>
                                    <th scope = "row" > {i}</th>
                                    <td>{list.name}</td>
                                    <td>{list.email}</td>
                                    <td>{list.mobile}</td>
                                    <td>{list.department == null ? `Not Availlable` : list.department.name}</td>
                                    <td>
                                        <Button color="info">
                                            <Link to = {`/employees/${list._id}`}
                                                style = {{color : "white"}}
                                            > 
                                                Show Detail</Link>
                                        </Button>{' '}</td>
                                    <td><Button 
                                        color="danger" 
                                        onClick = {() => this.props.handleRemove(list._id)} >Remove</Button>{' '}</td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                    </Table>
            </div>
        )
    }
}

export default TableDetails