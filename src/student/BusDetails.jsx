import React from 'react';
import './busdetails.css';

function BusDetails() {
  return (
    <div className="bus-details">
      <h2>Bus Information</h2>
      <table>
        <thead>
          <tr>
            <th>Bus Number</th>
            <th>Route</th>
            <th>Driver Name</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>BUS-101</td>
            <td>Ongole - College</td>
            <td>Ravi Kumar</td>
            <td>9876543210</td>
          </tr>
          <tr>
            <td>BUS-102</td>
            <td>Chirala - College</td>
            <td>Mahesh</td>
            <td>9123456789</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BusDetails;
