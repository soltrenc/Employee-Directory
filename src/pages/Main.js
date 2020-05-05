import React, { Component } from "react";
import Hero from "../components/Hero";
import API from "../utils/API";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import Table from 'react-bootstrap/Table';
import SearchForm from "../components/SearchForm";
import App from "../App";


class Main extends Component {
  state = {
    employees: [],
    nameOrder: 'asc'
  };

  componentDidMount() {
    var self = this;
    API.getRandomEmployees().then(function (data) {
      console.log("got a random employee", data.data.results);
      var employees = data.data.results;

      var newEmps = []
      for (var i = 0; i < employees.length; i++) {
        let id = 1;
        var newEmp = {
          id: + 1,
          name: employees[i].name.first,
          lastName: employees[i].name.last,
          email: employees[i].email,
          phone: employees[i].phone,
          dob: employees[i].dob.date,
          image: employees[i].picture.thumbnail,
        }
        newEmps.push(newEmp)
        console.log('looping ??', employees[i].name.first)

      }
      console.log('Do we have just what we need newEmps', newEmps)
      self.setState({
        employees:
          newEmps
      })
    });
  }

  handleName = () => {
    if (this.state.nameOrder === 'asc') {
      var newORder = this.state.employees.sort(function (a, b) {
        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
        if (nameA < nameB) //sort string descending
          return 1
        if (nameA > nameB)
          return -1
        return 0 //default return value (no sorting)
      })
      console.log('we clicked!!!', newORder)
      this.setState({
        employees: newORder,
        nameOrder: 'dsc'
      });
    } else if (this.state.nameOrder === 'dsc') {
      var newORder = this.state.employees.sort(function (a, b) {
        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
        if (nameA < nameB) //sort string ascending
          return -1
        if (nameA > nameB)
          return 1
        return 0 //default return value (no sorting)
      })
      console.log('we clicked!!!', newORder)
      this.setState({
        employees: newORder,
        nameOrder: 'asc'
      });
    }


  }

  render() {



    console.log('this is our state!!', this.state);

    return (
      <div>
        <Hero background-color="navy blue" margin-bottom="red 5px">
          <h1>Employee Directory</h1>
          <h2> Click on carrots to filter by heading or use the search bar to narrow results.</h2>
        </Hero>
        <Container>
          <Row>
            <Col size="md-12">

            </Col>
          </Row>
          <Row>
            <Col size="md-12">
              <Table responsive>
                <thead>
                  <tr>
                    <th> ID </th>
                    <th> Image </th>
                    <th onClick={this.handleName}> First Name </th>
                    <th> Last Name </th>
                    <th> Email </th>
                    <th> DOB </th>
                    <th> Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.employees.map(function (singleEmp) {
                    console.log("dob:", singleEmp.dob)
                    return (
                      <tr>
                        <td> {singleEmp.id} </td>
                        <td> {singleEmp.image} </td>
                        <td>{singleEmp.name}</td>
                        <td>{singleEmp.lastName}</td>
                        <td> {singleEmp.email}</td>
                        <td> {singleEmp.dob.toLocaleString()} </td>
                        <td> {singleEmp.phone} </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Main;
