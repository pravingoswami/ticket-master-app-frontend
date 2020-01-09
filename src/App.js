import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'

import {
  Navbar,
  Nav,
  NavItem,
  NavLink, NavbarBrand} from 'reactstrap'

import Home from './component/Home'
import Login from './component/user/Login'
import Register from './component/user/Register'

import CustomerList from './component/customers/List'
import CustomerNew from './component/customers/New'
import CustomerShow from './component/customers/Show'
import CustomerEdit from './component/customers/Edit'

import DepartmentList from './component/department/List'
import DepartmentShow from './component/department/Show'
import DepartmentEdit from './component/department/Edit'

import EmployeeList from './component/employee/List'
import EmployeeNew from './component/employee/New'
import EmployeeShow from './component/employee/Show'
import EmployeeEdit from './component/employee/Edit'

import TicketList from './component/ticket/List'
import TicketNew from './component/ticket/New'
import TicketShow from './component/ticket/Show'
import TicketEdit from './component/ticket/Edit'

import PieChart from './component/ticket/PieChart'


function App(props) {

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    window.location.href = '/account/login'
  }


  return (
    <BrowserRouter>
    <div>
      <Navbar color = "dark" >
                        <Nav>

                        <NavbarBrand href="/" style = {{color : "white"}} >Ticket Master</NavbarBrand>

                        </Nav>

                        <Nav></Nav>

                        {
                           localStorage.getItem('authToken') ? 
                        <Nav>

                        <NavItem>
                        <NavLink><Link to = "/" style = {{color : "white"}} >Home</Link></NavLink>
                        </NavItem>

                        <NavItem>
                        <NavLink><Link to = "/customers" style = {{color : "white"}} >Customers</Link></NavLink>
                        </NavItem>

                        <NavItem>
                        <NavLink><Link to = "/departments" style = {{color : "white"}} >Departments</Link></NavLink>
                        </NavItem>

                        <NavItem>
                        <NavLink><Link to = "/employees" style = {{color : "white"}} >Employees</Link></NavLink>
                        </NavItem>

                        <NavItem>
                        <NavLink><Link to = "/tickets" style = {{color : "white"}} >Tickets</Link></NavLink>
                        </NavItem>

                        <NavItem>
                        <NavLink><Link to = "/details" style = {{color : "white"}} >Details</Link></NavLink>
                        </NavItem>

                        

                        <NavItem>
                        <NavLink><Link to = "/account/login" style = {{color : "white"}}  onClick = {handleLogout} >Logout</Link></NavLink>
                        </NavItem>
                        </Nav>


                           : 
                         <Nav>

                        <NavItem>
                        <NavLink><Link to = "/" style = {{color : "white"}} >Home</Link></NavLink>
                        </NavItem>

                        <NavItem>
                        <NavLink><Link to = "/account/login" style = {{color : "white"}}  >Login</Link></NavLink>
                        </NavItem>

                        <NavItem>
                        <NavLink><Link to = "/accoount/register" style = {{color : "white"}}  >Register</Link></NavLink>
                        </NavItem> 


                        </Nav>
                        }


                    {/* </Nav> */}
                </Navbar>
    </div>

    <div>
      <Switch>
      <Route path = "/" component = {Home} exact = {true} />
      <Route path = "/account/login" component = {Login} />
      <Route path = "/accoount/register" component = {Register}/>

      <Route path = "/customers" component = {CustomerList} exact = {true} />
      <Route path = "/customers/new" component = {CustomerNew} exact = {true} />
      <Route path = "/customers/:id" component = {CustomerShow}  exact = {true} />
      <Route path = "/customers/edit/:id" component = {CustomerEdit} />

      <Route path = "/departments" component = {DepartmentList} exact = {true} />
      <Route path = "/departments/:departmentId" component = {DepartmentShow} exact = {true} />
      <Route path = "/departments/edit/:departmentId" component = {DepartmentEdit}  />

      <Route path = "/employees" component = {EmployeeList} exact = {true} />
      <Route path = "/employees/new" component = {EmployeeNew} exact = {true} />
      <Route path = "/employees/:employeeId" component = {EmployeeShow} exact = {true} />
      <Route path = "/employees/edit/:employeeId" component = {EmployeeEdit} />

      <Route path = "/tickets" component = {TicketList} exact = {true} />
      <Route path = "/tickets/new" component = {TicketNew} exact = {true} />
      <Route path = "/tickets/:ticketId" component = {TicketShow} exact = {true} />
      <Route path = "/tickets/edit/:ticketId" component = {TicketEdit} exact = {true} />

      <Route path = "/details" component = {PieChart} exact = {true} />





      </Switch>


    </div>


    </BrowserRouter>
  )
}

export default App;
