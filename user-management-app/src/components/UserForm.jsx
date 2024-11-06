import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const UserForm = () => {
  const { selectedUserIndex, displayedUsers, setSelectedUserIndex, addUser, updateUser } = useContext(UserContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [status, setStatus] = useState('active');

  // Set the form values based on the selected user index
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
      updateUser(selectedUserIndex, newUser); // Update the selected user
      resetForm(); // Reset the form fields after update
      setSelectedUserIndex(null); // Set selectedUserIndex to null to reset form
    } else {
      addUser(newUser); // Add new user if no user is selected
      resetForm(); // Reset the form fields after adding
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setAge('');
    setStatus('active');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mx-auto mb-6 bg-white rounded shadow md:w-1/2 lg:w-1/3">
      <h2 className="mb-3 text-lg font-bold text-center">{selectedUserIndex !== null ? 'Edit User' : 'Add User'}</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full p-2 mb-2 border rounded" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 mb-2 border rounded" required />
      <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" className="w-full p-2 mb-2 border rounded" required min="1" />
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2 mb-4 border rounded" required>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
        {selectedUserIndex !== null ? 'Update User' : 'Add User'}
      </button>
    </form>
  );
};

export default UserForm;
