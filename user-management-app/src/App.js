import React, { useContext } from 'react';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import Controls from './components/Controls';
import { UserContext } from './context/UserContext';

function App() {
  const { displayedUsers, addUser, updateUser, deleteUser, handleSortChange, handleFilterChange } = useContext(UserContext);

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold text-center">List User</h1>
      <UserForm addUser={addUser} updateUser={updateUser} displayedUsers={displayedUsers} />
      <Controls handleSortChange={handleSortChange} handleFilterChange={handleFilterChange} />
      <UserTable users={displayedUsers} deleteUser={deleteUser} />
    </div>
  );
}

export default App;
