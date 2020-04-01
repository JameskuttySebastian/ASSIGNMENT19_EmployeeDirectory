import React, { Component } from "react";
import employees from "../src/util/data/data.json";
import TableData from "./components/TableData";
import DropdownOption from "./components/DropdownOption";

class App extends Component {
  state = {
    tableRowHtmlArray: [],
    searchColumnValue: "all",
    searchValue: "",
    searchValueHtmlArray: []
  };

  setStateValue = (stateToUpdate, value) => {
    this.setState({ [stateToUpdate]: value });
  };

  //Creating the data rows for employees
  employeeListHtml = resultArray => {
    let tableRowHtml = resultArray.map((employee, index) => (
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
    return tableRowHtml;
  };

  componentDidMount() {
    this.setStateValue("tableRowHtmlArray", this.employeeListHtml(employees));
  }

  //Creating dropdown list of distinct values for selected column
  filterColumnChange = event => {
    const searchVal = event.target.value;
    this.setStateValue("searchColumn", searchVal);
    //if user select back "All", then remove all filters
    if (searchVal === "all") {
      this.setStateValue("searchColumnArray", this.employeeListHtml(employees)); //putting back all the employees
      this.setStateValue("searchValueHtmlArray", ""); // setting to empty value
    }
    //if user select a specific column, get distinct values and update dropdoen list for column values
    else {
      let columnList = this.createDropdownList(searchVal); //creating distinct column values
      let dropdownListHtml = this.createDropdownListMenu(columnList);
      this.setStateValue("searchColumnValueArray", dropdownListHtml);
    }
  };

  createDropdownList = async searchVal => {
    let colValues = Array.from(
      new Set(employees.map(employee => employee[searchVal]))
    );
    return colValues; //retruning column value array
  };

  createDropdownListMenu = columnList => {
    if (this.state.searchColumnValueArray.length) {
      let dropdownList = this.state.searchColumnValueArray.map((val, index) => (
        <DropdownOption key={index} value={val} />
      ));
      return dropdownList;
    }
  };

  filterValueChange = async event => {
    const searchValue = event.target.value;
    let filteredArray = employees.filter(
      employee => employee[this.state.searchColumn] === searchValue
    );
    this.setStateValue(
      "tableRowHtmlArray",
      this.employeeListHtml(filteredArray)
    );
  };

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
          {this.state.searchValueHtmlArray}
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
          <tbody>{this.state.tableRowHtmlArray}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
