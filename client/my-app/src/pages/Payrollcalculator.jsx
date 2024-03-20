

// PayrollCalculator.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Make sure to import useNavigate

const PayrollCalculator = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeEmail, setSelectedEmployeeEmail] = useState('');
  const [hoursWorked, setHoursWorked] = useState(0);
  const [hourlyWage, setHourlyWage] = useState(15);
  const [calculatedPay, setCalculatedPay] = useState(null);
  const navigate = useNavigate(); // Use navigate for redirection

  useEffect(() => {
    const role = localStorage.getItem('role'); // Get role from localStorage

    // Redirect if not admin
    if (role !== 'admin' && role !== 'employee') {
      navigate('/'); // Redirect to home page or a designated "not authorized" page
    }

    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/auth/getemployees');
        if (response.ok) {
          const data = await response.json();
          setEmployees(data);
        } else {
          throw new Error('Failed to fetch employees');
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, [navigate]);

  useEffect(() => {
    const fetchHoursWorked = async () => {
      if (!selectedEmployeeEmail) return;

      try {
        const response = await fetch(`http://localhost:3001/api/auth/employee-hours/${selectedEmployeeEmail}`);
        if (response.ok) {
          const data = await response.json();
          setHoursWorked(data.totalHours);
        } else {
          throw new Error('Failed to fetch hours worked');
        }
      } catch (error) {
        console.error('Error fetching hours worked:', error);
      }
    };

    fetchHoursWorked();
  }, [selectedEmployeeEmail]);

  const handleCalculatePay = () => {
    const pay = hoursWorked * hourlyWage;
    setCalculatedPay(pay);
  };

  return (
    <div>
      <ChatButton />
      <h2>Payroll Calculator</h2>
      <select onChange={e => setSelectedEmployeeEmail(e.target.value)} value={selectedEmployeeEmail}>
        <option value="">Select Employee</option>
        {employees.map(employee => (
          <option key={employee.email} value={employee.email}>{employee.fullname}</option>
        ))}
      </select>
      <div>Hours Worked: {hoursWorked}</div>
      <select onChange={e => setHourlyWage(e.target.value)} value={hourlyWage}>
        {[...Array(41)].map((_, i) => 15 + i * 0.25).map(wage => (
          <option key={wage} value={wage}>{`$${wage.toFixed(2)}`}</option>
        ))}
      </select>
      <button onClick={handleCalculatePay}>Calculate Pay</button>
      {calculatedPay !== null && <div>Calculated Pay: ${calculatedPay.toFixed(2)}</div>}
    </div>
  );
}

export default PayrollCalculator;
