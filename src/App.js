import React, { Component } from "react";
import employees from "../src/util/data/data.json";
import TableData from "./components/TableData";
import DropdownOption from "./components/DropdownOption";

class App extends Component {
  state = {
    tableRowHtmlArray: [],
    searchColumnValue: "all",
    searchValueHtmlArray: []
  };

  //This is for setting all the states
  setStateValue = (stateToUpdate, value) => {
    console.log("2. from setStateValue : " + value);
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

  //This is for updating table for first loading
  componentDidMount() {
    this.setStateValue("tableRowHtmlArray", this.employeeListHtml(employees));
  }

  //Creating dropdown list of distinct values for selected column
  filterColumnChange = async event => {
    const searchByColumn = event.target.value;
    console.log("1. searchByColumn : " + searchByColumn);
    //await is used since setstate is asynchronoue
    await this.setStateValue("searchColumnValue", searchByColumn); // setting to selected value each time
    console.log(
      "3. from state searchColumnValue: " + this.state.searchColumnValue
    );
    //if user select back "All", then remove all filters
    if (searchByColumn === "all") {
      this.setStateValue("tableRowHtmlArray", this.employeeListHtml(employees)); //putting back all the employees
      this.setStateValue("searchValueHtmlArray", ""); // setting to empty value
    }
    //if user select a specific column, get distinct values and update dropdoen list for column values
    else {
      let columnValueArray = this.createDropdownList(searchByColumn); //creating distinct column values
      let columnValueHtmlArray = this.createDropdownListMenu(columnValueArray);
      this.setStateValue("searchValueHtmlArray", columnValueHtmlArray);
    }
  };

  createDropdownList = searchByColumn => {
    let columnValueArray = Array.from(
      new Set(employees.map(employee => employee[searchByColumn]))
    );
    return columnValueArray; //retruning column value array
  };

  createDropdownListMenu = uniqueColumnValueArray => {
    if (uniqueColumnValueArray.length) {
      let uniqueColumnValueHtmlArray = uniqueColumnValueArray.map(
        (val, index) => <DropdownOption key={index} value={val} />
      );
      return uniqueColumnValueHtmlArray;
    }
  };

  filterValueChange = async event => {
    const searchValue = event.target.value;
    console.log(searchValue);
    console.log(this.state.searchByColumn);
    let filteredEmployeeArray = employees.filter(
      employee => employee[this.state.searchColumnValue] === searchValue
    );
    console.log(filteredEmployeeArray);
    this.setStateValue(
      "tableRowHtmlArray",
      this.employeeListHtml(filteredEmployeeArray)
    );
  };

  render() {
    return (
      <div className="container">
        <h1>Employee Dictionary</h1>
        {/* This section is statically created since columns are not changing */}
        <select onChange={this.filterColumnChange}>
          <option value="all">All</option>
          <option value="employeeId">Employee ID</option>
          <option value="jobTitleName">Title</option>
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
          <option value="phoneNumber">Phone</option>
          <option value="emailAddress">Email</option>
        </select>
        {/* This section is dynamically created based on column to filter */}
        <select id="columnValue" onChange={this.filterValueChange}>
          {this.state.searchValueHtmlArray}
        </select>
        {/* This section of the table is statically created since columns are not changing */}
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
          {/* This section of the table is dynamically created */}
          <tbody>{this.state.tableRowHtmlArray}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
