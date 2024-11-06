import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const UserTable = ({ users, deleteUser }) => {
  const { setSelectedUserIndex } = useContext(UserContext);

  const handleEdit = (index) => {
    setSelectedUserIndex(index); // Set the selected user index for editing
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-center border">Name</th>
            <th className="p-2 text-center border">Email</th>
            <th className="p-2 text-center border">Age</th>
            <th className="p-2 text-center border">Member Status</th>
            <th className="p-2 text-center border">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className="p-2 text-center border">{user.name}</td>
              <td className="p-2 text-center border">{user.email}</td>
              <td className="p-2 text-center border">{user.age}</td>
              <td className="p-2 text-center border">{user.status}</td>
              <td className="p-2 text-center border">
                <button onClick={() => handleEdit(index)} className="px-2 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600">
                  Edit
                </button>
                <button onClick={() => deleteUser(index)} className="px-2 py-1 ml-2 text-white bg-red-500 rounded hover:bg-red-600">
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
