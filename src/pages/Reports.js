import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import SummaryApi from '../common';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Registro de componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Reports = () => {
  const [monthlyReport, setMonthlyReport] = useState([]);
  const [productReport, setProductReport] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonthlyReport = async () => {
      try {
        const response = await fetch(SummaryApi.reportMonthly.url, {
          method: SummaryApi.reportMonthly.method,
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setMonthlyReport(data);
        } else {
          throw new Error('Data is not an array');
        }
      } catch (error) {
        setError(error.message);
        console.error('Error fetching monthly report:', error);
      }
    };

    const fetchProductReport = async () => {
      try {
        const response = await fetch(SummaryApi.reportProducts.url, {
          method: SummaryApi.reportProducts.method,
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setProductReport(data);
        } else {
          throw new Error('Data is not an array');
        }
      } catch (error) {
        setError(error.message);
        console.error('Error fetching product report:', error);
      }
    };

    fetchMonthlyReport();
    fetchProductReport();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const barData = {
    labels: monthlyReport.map(item => `${item._id.month}/${item._id.year}`),
    datasets: [
      {
        label: 'Total Sales',
        data: monthlyReport.map(item => item.totalSales),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: productReport.map(item => item.productName), // Aquí podrías usar el nombre del producto si lo tienes
    datasets: [
      {
        label: 'Total Revenue',
        data: productReport.map(item => item.totalRevenue),
        backgroundColor: productReport.map((_, index) => `hsl(${index * 30}, 70%, 50%)`),
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Monthly Sales Report</h1>
      <div className="mb-8">
        <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
      <table className="min-w-full bg-white border border-gray-300 rounded-md overflow-hidden shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">Month</th>
            <th className="py-2 px-4 text-left">Year</th>
            <th className="py-2 px-4 text-left">Total Sales</th>
            <th className="py-2 px-4 text-left">Total Orders</th>
          </tr>
        </thead>
        <tbody>
          {monthlyReport.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-4">{item._id.month}</td>
              <td className="py-2 px-4">{item._id.year}</td>
              <td className="py-2 px-4">{item.totalSales}</td>
              <td className="py-2 px-4">{item.totalOrders}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1 className="text-2xl font-bold mt-8 mb-4">Sales by Product</h1>
      <div className="mb-8">
        <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
      <table className="min-w-full bg-white border border-gray-300 rounded-md overflow-hidden shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">Product Name</th>
            <th className="py-2 px-4 text-left">Total Sold</th>
            <th className="py-2 px-4 text-left">Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {productReport.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-4">{item.productName}</td>
              <td className="py-2 px-4">{item.totalSold}</td>
              <td className="py-2 px-4">{item.totalRevenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
