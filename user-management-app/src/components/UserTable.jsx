import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa6';

const UserTable = ({ users, deleteUser }) => {
  const { setSelectedUserIndex } = useContext(UserContext);

  const handleEdit = (index) => {
    setSelectedUserIndex(index); // Set the selected user index for editing
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-center">
        <thead>
          <tr>
            <th className="p-2 text-center">Name</th>
            <th className="p-2 text-center">Email</th>
            <th className="p-2 text-center">Age</th>
            <th className="p-2 text-center">Member Status</th>
            <th className="p-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr className="bg-white border-b-4 border-[#f2f5fb]" key={index}>
              <td className="p-2 text-center">{user.name}</td>
              <td className="p-2 text-center">{user.email}</td>
              <td className="p-2 text-center">{user.age}</td>
              <td className="p-2 text-center">{user.status}</td>
              <td className="flex items-center justify-center gap-4 p-4">
                <FaEdit className="text-green-600 cursor-pointer hover:text-green-900" onClick={() => handleEdit(index)} />
                <FaTrash className="text-red-600 cursor-pointer hover:text-red-900" onClick={() => deleteUser(index)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
