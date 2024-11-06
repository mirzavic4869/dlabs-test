import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      setUsers(parsedUsers);
      setDisplayedUsers(parsedUsers);
    } else {
      fetchUsers();
    }
  }, []);

  useEffect(() => {
    console.log('Fetched users:', displayedUsers);
  }, [displayedUsers]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://api.github.com/users');
      const data = await response.json();
      const usersData = data.map((user) => ({
        name: user.login,
        email: 'N/A',
        age: 'N/A',
        status: 'active',
      }));
      setUsers(usersData);
      setDisplayedUsers(usersData);
      localStorage.setItem('users', JSON.stringify(usersData));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addUser = (user) => {
    setUsers((prev) => {
      const updatedUsers = [...prev, user];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      return updatedUsers;
    });
    setDisplayedUsers((prev) => [...prev, user]);
  };

  const updateUser = (index, updatedUser) => {
    const updatedUsers = [...users];
    updatedUsers[index] = updatedUser;
    setUsers(updatedUsers);
    setDisplayedUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const deleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    setDisplayedUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleSortChange = (sortKey) => {
    const sortedUsers = [...displayedUsers].sort((a, b) => {
      if (sortKey === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortKey === 'age') {
        return a.age - b.age;
      }
      if (sortKey === 'status') {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });
    setDisplayedUsers(sortedUsers);
  };

  const handleFilterChange = (status) => {
    if (status === '') {
      setDisplayedUsers(users);
    } else {
      const filteredUsers = users.filter((user) => user.status === status);
      setDisplayedUsers(filteredUsers);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        displayedUsers,
        setDisplayedUsers,
        selectedUserIndex,
        setSelectedUserIndex,
        addUser,
        updateUser,
        deleteUser,
        handleSortChange,
        handleFilterChange,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
