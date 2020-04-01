import React, { Component } from "react";
import employees from "../src/util/data/data.json";
import TableData from "./components/TableData";
import DropdownOption from "./components/DropdownOption";

class App extends Component {
  state = {
    tableRowHtmlArray: [],
    sortedArray: [],
    searchColumnValue: "all",
    searchValueHtmlArray: []
  };

  //This is for setting all the states
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

  //This is for updating table for first loading
  componentDidMount() {
    this.setStateValue("sortedArray", employees); // this is for sorting
    this.setStateValue("tableRowHtmlArray", this.employeeListHtml(employees));
  }

  //Creating dropdown list of distinct values for selected column
  filterByColumnChange = async event => {
    const searchByColumn = event.target.value;
    //await is used since setstate is asynchronoue
    this.setStateValue("searchColumnValue", searchByColumn); // setting to selected value each time

    //if user select back "All", then remove all filters
    if (searchByColumn === "all") {
      await this.setStateValue("sortedArray", employees); // this is for sorting
      await this.setStateValue(
        "tableRowHtmlArray",
        this.employeeListHtml(employees)
      ); //putting back all the employees
      await this.setStateValue("searchValueHtmlArray", ""); // setting to empty value
    }
    //if user select a specific column, get distinct values and update dropdoen list for column values
    else {
      let columnValueArray = this.createDropdownList(searchByColumn); //creating distinct column values
      let columnValueHtmlArray = this.createDropdownListHtml(columnValueArray);
      this.setStateValue("searchValueHtmlArray", columnValueHtmlArray);
    }
  };

  //Getting columns for drop down list for select column
  createDropdownList = searchByColumn => {
    let columnValueArray = Array.from(
      new Set(employees.map(employee => employee[searchByColumn]))
    );
    return columnValueArray; //retruning column value array
  };

  //Creating html for drop down list for select column
  createDropdownListHtml = uniqueColumnValueArray => {
    if (uniqueColumnValueArray.length) {
      let uniqueColumnValueHtmlArray = uniqueColumnValueArray.map(
        (val, index) => <DropdownOption key={index} value={val} />
      );
      return uniqueColumnValueHtmlArray;
    }
  };

  // filter array based on filter condition
  filterValueChange = async event => {
    let searchValue = event.target.value;
    // if the column value is an integer (for user id column), then assign the value as integer
    if (searchValue == parseInt(searchValue, 10)) {
      searchValue = parseInt(searchValue);
    }
    // filter based on search value
    let filteredEmployeeArray = employees.filter(
      employee => employee[this.state.searchColumnValue] === searchValue
    );
    await this.setStateValue("sortedArray", filteredEmployeeArray); // this is for sorting after filter
    await this.setStateValue(
      "tableRowHtmlArray",
      this.employeeListHtml(filteredEmployeeArray)
    );
  };

  sortByColumnChange = event => {
    let searchValue = event.target.value;
    console.log(searchValue);
    // sort by name
    let sortedObjectArray = this.state.sortedArray.sort(function(a, b) {
      var nameA = a[searchValue];
      var nameB = b[searchValue];
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });

    this.setStateValue("sortedArray", sortedObjectArray);

    this.setStateValue(
      "tableRowHtmlArray",
      this.employeeListHtml(sortedObjectArray)
    );
  };

  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h2 className="display-4">Employee Dictionary</h2>
            <p className="lead">
              Current employees database for the organisation.
            </p>
          </div>
        </div>

        <div className="container">
          <div id="wrapper" className="col-sm-12 col-md-12">
            <div id="left" className="col-sm-12 col-md-6">
              {/* This section is statically created since columns are not changing */}
              <label className="col-sm-12 col-md-6">Filter by:</label>
              <select
                className="col-sm-12 col-md-6 select-css"
                id="filter-column"
                onChange={this.filterByColumnChange}
              >
                <option value="all">All</option>
                <option value="employeeId">Employee ID</option>
                <option value="jobTitleName">Title</option>
                <option value="firstName">First Name</option>
                <option value="lastName">Last Name</option>
                <option value="phoneNumber">Phone</option>
                <option value="emailAddress">Email</option>
              </select>
              {/* This section is dynamically created based on column to filter */}
              <label className="col-sm-12 col-md-6">Filter value:</label>
              <select
                className="col-sm-12 col-md-6 select-css"
                id="filter-value"
                onChange={this.filterValueChange}
              >
                {this.state.searchValueHtmlArray}
              </select>
            </div>
            <div id="right" className="col-sm-12 col-md-6">
              <label className="col-sm-12 col-md-6">Sort by:</label>
              <select
                className="col-sm-12 col-md-6 select-css"
                id="filter-column"
                onChange={this.sortByColumnChange}
              >
                <option value="employeeId">Employee ID</option>
                <option value="jobTitleName">Title</option>
                <option value="firstName">First Name</option>
                <option value="lastName">Last Name</option>
                <option value="phoneNumber">Phone</option>
                <option value="emailAddress">Email</option>
              </select>
            </div>
          </div>

          {/* This section of the table is statically created since columns are not changing */}
          <table>
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
      </div>
    );
  }
}

export default App;
