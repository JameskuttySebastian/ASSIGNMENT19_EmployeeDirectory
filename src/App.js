import React, { Component } from "react";
import employees from "../src/util/data/data.json";
import TableData from "./components/TableData";
import DropdownOption from "./components/DropdownOption";

class App extends Component {
  state = {
    tableRowHtmlArray: "",
    searchColumnValue: "all",
    searchColumnValueArray: [],
    searchValue: "",
    searchValueHtmlArray: ""
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
    this.setStateValue( searchColumn, searchVal );
    if (searchVal === "all") {
        this.setStateValue( searchColumnArray, this.employeeListHtml(employees) );//putting back all the employees
        this.setStateValue( searchColumnValueArray, [] ); // setting to empty array
        this.setStateValue( searchValue, "" ); // setting to empty value
        this.setStateValue( searchValueState, "" );  // setting to empty value    
    }
    else {
      let columnList = this.createDropdownList(searchVal);
      this.setStateValue( searchColumnValueArray, columnList );
    }
  };

  setStateValue = (stateToUpdate, value) => {
    this.setState({ stateToUpdate: value });
  }

  createDropdownList = async searchVal => {
    let colValues = Array.from(
      new Set(employees.map(employee => employee[searchVal]))
    );
    return colValues; //retruning column value array  
  };


  await this.setState({
    searchColumnArray: colValues,
    searchColumnChange: true
  });
  this.createDropdownListMenu();

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
