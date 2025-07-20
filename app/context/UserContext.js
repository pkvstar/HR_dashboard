'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [bookMarkedUser, setBookMarkedUsers] = useState([]);


  function addBookMarkUser(data) {
    console.log("Added from context:", data);
    setBookMarkedUsers(prev => [...prev, data]);
  }

  function deleteBookMarkUser(id) {
    const newData = bookMarkedUser.filter((el) => el.id !== id);
    setBookMarkedUsers(newData);
  }

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    const storedBookmarks = localStorage.getItem('bookMarkedUsers');

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

    if (storedBookmarks) {
      setBookMarkedUsers(JSON.parse(storedBookmarks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bookMarkedUsers', JSON.stringify(bookMarkedUser));
  }, [bookMarkedUser]);

  return (
    <UserContext.Provider value={{ users, bookMarkedUser, addBookMarkUser, deleteBookMarkUser , bookMarkedUser }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUsers() {
  return useContext(UserContext);
}
