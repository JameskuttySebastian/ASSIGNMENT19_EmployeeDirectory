import React, { Component } from "react";
import employees from "../src/util/data/data.json";
import TableData from "./components/TableData";
import DropdownOption from "./components/DropdownOption";

class App extends Component {
  state = {
    result: [],
    tableState: "",
    searchColumn: "all",
    searchColumnArray: [],
    searchColumnChange: false,
    searchValue: "",
    searchValueChange: false,
    searchValueState: ""
  };

  employeeListHtml = () => {
    let htmlTable = this.state.result.map((employee, index) => (
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
    // console.log("HTML Table: " + JSON.stringify(htmlTable));
    this.setState({ tableState: htmlTable });
    // console.log("Table State: " + this.state.tableState);
  };

  filterColumnChange = async event => {
    if (event.target.value) {
      await this.setState({ searchColumn: event.target.value });
      this.createDropdownList();
      //   console.log("searchColumnChange: " + this.state.searchColumnChange); // this is running after createDropdownList()
    }
  };

  filterValueChange = async event => {
    if (event.target.value) {
      this.setState({ searchValue: event.target.value });

      if (this.state.searchColumn === "all") {
        await this.setState({
          result: employees,
          searchColumnArray: [],
          searchColumnChange: false
        });
      } else {
        console.log("searchColumnChange: " + this.state.searchColumnChange);
        await this.setState({ searchValueChange: true });
        console.log("searchValueChange: " + this.state.searchValueChange);
      }
    }
  };

  createDropdownList = async () => {
    let colValues = Array.from(
      new Set(
        this.state.result.map(employee => employee[this.state.searchColumn])
      )
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

  async componentDidMount() {
    await this.setState({ result: employees });
    this.employeeListHtml();
    this.createDropdownListMenu();
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
