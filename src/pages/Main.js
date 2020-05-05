import React, { Component } from "react";
import Hero from "../components/Hero";
import API from "../utils/API";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import Table from 'react-bootstrap/Table';
import App from "../App";
import moment from "moment";


class Main extends Component {
  state = {
    employees: [],
    filteredEmployees: [],
    nameOrder: 'asc',
    showFilter: false
  };

  searchSpace = (e) => {
    console.log("we're typing in the search bar!", e.target.value)
    var filteredEmps = []
    for (var i = 0; i < this.state.employees.length; i++) {
      var subs = this.state.employees[i].name.substring(0, e.target.value.length);
      if (subs.toLowerCase() === e.target.value.toLowerCase()) {
        filteredEmps.push(this.state.employees[i]);
      }
    }
    console.log('did the filter work ??', filteredEmps)
    this.setState({
      filteredEmployees: filteredEmps,
      showFilter: true
    })
  }

  componentDidMount() {
    var self = this;
    API.getRandomEmployees().then(function (data) {
      console.log("got a random employee", data.data.results);
      var employees = data.data.results;

      var newEmps = []
      for (var i = 0; i < employees.length; i++) {
        var newEmp = {
          name: employees[i].name.first,
          lastName: employees[i].name.last,
          email: employees[i].email,
          phone: employees[i].phone,
          dob: moment(employees[i].dob.date).format('MMMM Do YYYY'),
          image: employees[i].picture.thumbnail,
        }
        console.log(moment(newEmp.dob).format("MMM Do YY"))
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

    var pplToShow = this.state.employees
    if (this.state.showFilter === true) {
      pplToShow = this.state.filteredEmployees
    }

    return (
      <div>
        <Hero>
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
              <input type="text" style={{ marginLeft: "50%", marginTop: "20px", marginBottom: "20px", borderRadius: "15px" }} placeholder="Enter item to be searched" onChange={(e) => this.searchSpace(e)} />
              <Table responsive>
                <thead>
                  <tr>
                    <th> Image </th>
                    <th onClick={this.handleName}> First Name </th>
                    <th> Last Name </th>
                    <th> Email </th>
                    <th> DOB </th>
                    <th> Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {pplToShow.map(function (singleEmp) {
                    console.log("dob:", singleEmp.dob)
                    return (
                      <tr>
                        <td> <img src={singleEmp.image} /> </td>
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
