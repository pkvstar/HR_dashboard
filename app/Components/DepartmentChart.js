'use client';
import React, { useEffect, useState } from 'react';
import { useUsers } from '../context/UserContext';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const users = [
  { company: { department: 'Engineering' } },
  { company: { department: 'Support' } },
  { company: { department: 'Research and Development' } },
  { company: { department: 'Support' } },
  { company: { department: 'Human Resources' } },
];

const DepartmentChart = () => {
  const {theme} = useUsers();
  const [chartData, setChartData] = useState(null);
  const [bookmarkData, setBookmarkData] = useState(null);

  useEffect(() => {

    const deptSet = new Set();
    users.forEach(user => {
      const dept = user.company?.department || 'Unknown';
      deptSet.add(dept);
    });

    const departments = Array.from(deptSet);
    const randomRatings = departments.map(() => Math.floor(Math.random() * 5) + 1);

    setChartData({
      labels: departments,
      datasets: [
        {
          label: 'Department Ratings',
          data: randomRatings,
          backgroundColor: 'rgba(59, 130, 246, 0.7)',
          borderRadius: 8,
        },
      ],
    });

    const last7Days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const bookmarkCounts = last7Days.map(() => Math.floor(Math.random() * 10) + 1);

    setBookmarkData({
      labels: last7Days,
      datasets: [
        {
          label: 'Bookmarks Added',
          data: bookmarkCounts,
          fill: false,
          borderColor: '#10b981',
          backgroundColor: '#6ee7b7',
          tension: 0.3,
        },
      ],
    });
  }, []);

  return (
    <div className={`${ theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'} mx-auto space-y-10 bg-gray-50 px-40 pb-20 shadow`}>

      <div className={`${ theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'} p-6 rounded-xl shadow`}>
        <h2 className={` ${ theme === 'light' ? 'text-gray-900' : 'text-gray-50'}  text-2xl font-bold mb-4 text-center`}>Department Ratings</h2>
        {chartData ? (
          <Bar data={chartData} />
        ) : (
          <p className="text-gray-500 text-center">Loading department chart...</p>
        )}
      </div>


      <div className={`${ theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}bg-white p-6 rounded-xl shadow`}>
        <h2 className={`text-2xl font-bold mb-4 text-center ${ theme === 'light' ? 'text-gray-900' : 'text-gray-50'} `}>Bookmark Trends (Past 7 Days)</h2>
        {bookmarkData ? (
          <Line data={bookmarkData} />
        ) : (
          <p className="text-gray-500 text-center">Loading trends chart...</p>
        )}
      </div>
    </div>
  );
};

export default DepartmentChart;
