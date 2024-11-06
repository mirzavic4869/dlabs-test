// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);

  // Fungsi untuk memuat data dari localStorage
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      setUsers(parsedUsers);
      setDisplayedUsers(parsedUsers);
    } else {
      fetchUsers(); // Mengambil data dari API jika tidak ada di localStorage
    }
  }, []); // Pastikan hanya dipanggil sekali saat pertama kali render

  useEffect(() => {
    console.log('Fetched users:', displayedUsers); // Cek apakah data sudah ada di displayedUsers
  }, [displayedUsers]); // Akan dipanggil setiap kali displayedUsers diupdate

  // Fungsi untuk mengambil data pengguna dari API eksternal
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
      // Set users dan displayedUsers sekaligus
      setUsers(usersData);
      setDisplayedUsers(usersData); // Update displayedUsers setelah berhasil fetch
      localStorage.setItem('users', JSON.stringify(usersData));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fungsi untuk menyimpan data ke localStorage
  const saveToLocalStorage = (data) => {
    localStorage.setItem('users', JSON.stringify(data));
  };

  // Fungsi untuk menambah atau memperbarui pengguna
  const addUser = (user) => {
    setUsers((prev) => {
      const updatedUsers = [...prev, user];
      saveToLocalStorage(updatedUsers);
      return updatedUsers;
    });
    setDisplayedUsers((prev) => [...prev, user]);
  };

  const updateUser = (index, updatedUser) => {
    const updatedUsers = [...users];
    updatedUsers[index] = updatedUser;
    setUsers(updatedUsers);
    setDisplayedUsers(updatedUsers);
    saveToLocalStorage(updatedUsers);
  };

  const deleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    setDisplayedUsers(updatedUsers);
    saveToLocalStorage(updatedUsers);
  };

  const value = {
    users,
    displayedUsers,
    setDisplayedUsers,
    addUser,
    updateUser,
    deleteUser,
    handleSortChange: (criterion) => {
      let sortedUsers = [...displayedUsers];
      if (criterion === 'age') {
        sortedUsers.sort((a, b) => a.age - b.age);
      } else {
        sortedUsers.sort((a, b) => a[criterion].localeCompare(b[criterion]));
      }
      setDisplayedUsers(sortedUsers);
    },
    handleFilterChange: (status) => {
      if (status) {
        setDisplayedUsers(users.filter((user) => user.status === status));
      } else {
        setDisplayedUsers(users);
      }
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
