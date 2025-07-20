'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      fetch('https://dummyjson.com/users?limit=20')
        .then(res => res.json())
        .then(data => {
          setUsers(data.users);
          localStorage.setItem('users', JSON.stringify(data.users));
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ users }}>
      {children}
    </UserContext.Provider>
  );
};
