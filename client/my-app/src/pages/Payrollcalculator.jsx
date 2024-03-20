import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatButton from './ChatButton';
import Header from './Header';
import Footer from './Footer';
import "../styles/PayrollCalculator.css"

const PayrollCalculator = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeEmail, setSelectedEmployeeEmail] = useState(localStorage.getItem('email') || '');
  const [hoursWorked, setHoursWorked] = useState(0);
  const [hourlyWage, setHourlyWage] = useState(15);
  const [calculatedPay, setCalculatedPay] = useState(null);
  const navigate = useNavigate(); // Use navigate for redirection
  const role = localStorage.getItem('role'); // Moved outside to be used in multiple places

  useEffect(() => {
    // Redirect if not admin or employee
    if (role !== 'admin' && role !== 'employee') {
      navigate('/'); // Redirect to home page or a designated "not authorized" page
    }

    // For admin, fetch all employees. Employees skip this step.
    if (role === 'admin') {
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
    }
  }, [navigate, role]);

  useEffect(() => {
    // Fetch hours worked when an employee is selected or if logged in as an employee
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
    <div className= "headerDiv">
      <Header/>
    <div className="payroll-calculator-container">
      
      <ChatButton />
      <div className="payroll-calculator-form">
        <h2 className="payroll-calculator-title">Payroll Calculator</h2>
        {role === 'admin' && (
          <select className="payroll-calculator-select" onChange={e => setSelectedEmployeeEmail(e.target.value)} value={selectedEmployeeEmail}>
            <option value="">Select Employee</option>
            {employees.map(employee => (
              <option key={employee.email} value={employee.email}>{employee.fullname}</option>
            ))}
          </select>
        )}
        <div>Hours Worked: {hoursWorked}</div>
        <select className="payroll-calculator-select" onChange={e => setHourlyWage(e.target.value)} value={hourlyWage}>
          {[...Array(41)].map((_, i) => 15 + i * 0.25).map(wage => (
            <option key={wage} value={wage}>{`$${wage.toFixed(2)}`}</option>
          ))}
        </select>
        <button className="payroll-calculator-button" onClick={handleCalculatePay}>Calculate Pay</button>
        {calculatedPay !== null && <div className="payroll-calculator-output">Calculated Pay: ${calculatedPay.toFixed(2)}</div>}
      </div>
      <Footer/>
    </div>
    </div>
  );
};

export default PayrollCalculator;
