import React, { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import Controls from './components/Controls';

function App() {
  const [users, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers) {
      setUsers(storedUsers);
      setDisplayedUsers(storedUsers);
    } else {
      fetchUsers();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://api.github.com/users');
      const data = await response.json();
      const formattedUsers = data.map((user) => ({
        name: user.login,
        email: 'N/A',
        age: 'N/A',
        status: 'active',
      }));
      setUsers(formattedUsers);
      setDisplayedUsers(formattedUsers);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data. Please try again later.');
    }
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold text-center">List User</h1>
      <UserForm users={users} setUsers={setUsers} displayedUsers={displayedUsers} setDisplayedUsers={setDisplayedUsers} selectedUserIndex={selectedUserIndex} setSelectedUserIndex={setSelectedUserIndex} />
      <Controls users={users} setDisplayedUsers={setDisplayedUsers} />
      <UserTable users={displayedUsers} setUsers={setUsers} setDisplayedUsers={setDisplayedUsers} setSelectedUserIndex={setSelectedUserIndex} />
    </div>
  );
}

export default App;
