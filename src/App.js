import React, { Component } from "react";
import employees from "../src/util/data/data.json";
import TableData from "./components/TableData";

let employeeList = employees;

const employeeListHtml = () => {
  return employeeList.map((employee, index) => (
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
class App extends Component {
  state = {
    employees
  };
  render() {
    return (
      <div className="container">
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
          <tbody>{employeeListHtml()}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
