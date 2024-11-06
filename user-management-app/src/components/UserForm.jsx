import React, { useState, useEffect } from 'react';

const UserForm = ({ users, setUsers, displayedUsers, setDisplayedUsers, selectedUserIndex, setSelectedUserIndex }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [status, setStatus] = useState('active');

  useEffect(() => {
    if (selectedUserIndex !== null) {
      const user = displayedUsers[selectedUserIndex];
      setName(user.name);
      setEmail(user.email);
      setAge(user.age);
      setStatus(user.status);
    }
  }, [selectedUserIndex, displayedUsers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email, age, status };

    if (selectedUserIndex !== null) {
      const updatedUsers = [...displayedUsers];
      updatedUsers[selectedUserIndex] = newUser;
      setDisplayedUsers(updatedUsers);
      setUsers(updatedUsers);
    } else {
      setDisplayedUsers([...displayedUsers, newUser]);
      setUsers([...users, newUser]);
    }

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setAge('');
    setStatus('active');
    setSelectedUserIndex(null);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mx-auto mb-6 bg-white rounded shadow md:w-1/2 lg:w-1/3">
      <h2 className="mb-3 text-lg font-bold text-center">User Form</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full p-2 mb-2 border rounded" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 mb-2 border rounded" required />
      <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" className="w-full p-2 mb-2 border rounded" required min="1" />
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2 mb-4 border rounded" required>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <div className="flex justify-end">
        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Simpan
        </button>
        <button type="button" onClick={resetForm} className="px-4 py-2 ml-2 text-white bg-gray-500 rounded hover:bg-gray-600">
          Batal
        </button>
      </div>
    </form>
  );
};

export default UserForm;
