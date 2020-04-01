import React from "react";

function TableData(props) {
  return (
    <tr>
      <td>{props.employeeId}</td>
      <td>{props.jobTitleName}</td>
      <td>{props.firstName}</td>
      <td>{props.lastName}</td>
      <td>{props.phoneNumber}</td>
      <td>{props.emailAddress}</td>
    </tr>
  );
}

export default TableData;
