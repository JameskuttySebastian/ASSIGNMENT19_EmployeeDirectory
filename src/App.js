import React, { Component } from "react";
import employees from "../src/util/data/data.json";
import TableData from "./components/TableData";

class App extends Component {
  state = {
    result: [],
    searchColumn: "",
    searchValue: ""
  };

  employeeListHtml = () => {
    return this.state.result.map((employee, index) => (
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
  };

  searchColumnValue = () => {};

  columnHandleChange = async event => {
    await this.setState({ searchColumn: event.target.value });
    this.createDropdownList();
  };

  createDropdownList = async () => {
    let val = this.state.searchValue;
    if (this.state.searchColumn === "all") {
      await this.setState({ result: employees });
    } else {
      await this.setState({
        result: employees.filter(
          employee => employee.this.state.searchColumn === val
        )
      });
    }
  };

  componentDidMount() {
    this.setState({ result: employees });
  }

  render() {
    return (
      <div className="container">
        <h1>Employee Dictionary</h1>

        <select id="columnList" onChange={this.columnHandleChange}>
          <option value="all">All</option>
          <option value="employeeId">Employee ID</option>
          <option value="jobTitleName">Title</option>
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
          <option value="phoneNumber">Phone</option>
          <option value="emailAddress">Email</option>
        </select>
        <select id="columnValue"></select>
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
          <tbody>{this.employeeListHtml()}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
