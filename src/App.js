import React, { Component } from "react";
import employees from "../src/util/data/data.json";
import TableData from "./components/TableData";
import DropdownOption from "./components/DropdownOption";

class App extends Component {
  state = {
    tableState: "",
    searchColumn: "all",
    searchColumnArray: [],
    searchValue: "",
    searchValueState: ""
  };

  employeeListHtml = resultArray => {
    let htmlTable = resultArray.map((employee, index) => (
      <TableData
        key={index}
        employeeId={employee.employeeId}
        jobTitleName={employee.jobTitleName}
        firstName={employee.firstName}
        lastName={employee.lastName}
        phoneNumber={employee.phoneNumber}
        emailAddress={employee.emailAddress}
      />
    ));
    return htmlTable;
  };

  filterColumnChange = event => {
    const searchVal = event.target.value;
    this.setState({ searchColumn: searchVal });
    if (searchVal === "all") {
      this.setState({
        tableState: this.employeeListHtml(employees),
        searchColumnArray: [],
        searchValue: "",
        searchValueState: ""
      });
    } else {
      this.createDropdownList(searchVal);
      //   console.log("searchColumnChange: " + this.state.searchColumnChange); // this is running after createDropdownList()
    }
  };

  createDropdownList = async searchVal => {
    let colValues = Array.from(
      new Set(employees.map(employee => employee[searchVal]))
    );
    console.log(JSON.stringify(colValues));
    await this.setState({
      searchColumnArray: colValues,
      searchColumnChange: true
    });
    this.createDropdownListMenu();
  };

  createDropdownListMenu = () => {
    if (this.state.searchColumnArray.length) {
      let dropdownList = this.state.searchColumnArray.map((val, index) => (
        <DropdownOption key={index} value={val} />
      ));
      console.log("dropdownList Table: " + dropdownList);
      this.setState({ searchValueState: dropdownList });
      console.log("dropdownList State: " + this.searchValueState);
    }
  };

  filterValueChange = async event => {
    const searchValue = event.target.value;
    let filteredArray = employees.filter(
      employee => employee[this.state.searchColumn] === searchValue
    );
    this.setState({ tableState: this.employeeListHtml(filteredArray) });
  };

  componentDidMount() {
    this.setState({ tableState: this.employeeListHtml(employees) });
  }

  render() {
    return (
      <div className="container">
        <h1>Employee Dictionary</h1>
        <select onChange={this.filterColumnChange}>
          <option value="all">All</option>
          <option value="employeeId">Employee ID</option>
          <option value="jobTitleName">Title</option>
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
          <option value="phoneNumber">Phone</option>
          <option value="emailAddress">Email</option>
        </select>
        <select id="columnValue" onChange={e => this.filterValueChange(e)}>
          {this.state.searchValueState}
        </select>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Employee ID</th>
              <th scope="col">Title</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>{this.state.tableState}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
