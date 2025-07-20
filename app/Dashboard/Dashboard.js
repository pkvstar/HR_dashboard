'use client';
import React, { useEffect, useState } from 'react';
import { useUsers } from '../context/UserContext';
import Link from 'next/link';

const DashBoard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const {addBookMarkUser} = useUsers();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const ratedUsers = storedUsers.map(user => ({
      ...user,
      rating: (Math.random() * 2 + 3).toFixed(1),
    }));
    setUsers(ratedUsers);
  }, []);

  const allDepartments = [...new Set(users.map(u => u.company?.department).filter(Boolean))];

  const toggleDepartment = (dept) => {
    setSelectedDepartments((prev) =>
      prev.includes(dept)
        ? prev.filter(d => d !== dept)
        : [...prev, dept]
    );
  };
  function resetDep(){
    setSelectedDepartments([]);
  }

  const filteredUsers = users.filter(user => {
    const name = `${user.firstName} ${user.lastName}`.toLowerCase();
    const email = user.email.toLowerCase();
    const department = user.company?.department?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      name.includes(search) ||
      email.includes(search) ||
      department.includes(search);

    const matchesDepartment =
      selectedDepartments.length === 0 ||
      selectedDepartments.includes(user.company?.department);

    return matchesSearch && matchesDepartment;
  });

  function addBook(data){
    addBookMarkUser(data);
    alert(`${data.firstName} is added in Bookmarks`);
  }

  function promotionUser(data){
    alert(`${data.firstName} ${data.lastName} is promoted to higher post`);
  } 
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Employee Dashboard</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by name, email, or department"
          className="px-4 py-2 border rounded-md w-full sm:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex flex-wrap gap-2">
          {allDepartments.map((dept) => (
            <button
              key={dept}
              onClick={() => toggleDepartment(dept)}
              className={`px-3 py-1 border rounded-full cursor-pointer text-sm ${
                selectedDepartments.includes(dept)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              {dept}
            </button>
          ))}
          <button onClick={resetDep} className='px-2 py-1 hover:bg-red-500 hover:text-white rounded-lg text-sm cursor-pointer border-2 border-red-600 text-red-600'>reset</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-5 flex flex-col"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="text-sm text-gray-700 flex flex-col gap-1">
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Department:</strong> {user.company?.department}</p>
              <p><strong>Title:</strong> {user.company?.title}</p>
              <p><strong>Rating:</strong> ⭐ {user.rating}</p>
            </div>

            <div className="mt-4 flex gap-2">
              <Link href={`/employee/${user.id}`}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                  View
                </button>
              </Link>
              <button onClick={()=>{addBook(user)}} className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded text-sm">
                Bookmark
              </button>
              <button onClick={()=>{promotionUser(user)}} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">
                Promote
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashBoard;
