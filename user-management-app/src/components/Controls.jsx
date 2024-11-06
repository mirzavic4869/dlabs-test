import React from 'react';
import { FaFilter, FaSort } from 'react-icons/fa';

const Controls = ({ handleSortChange, handleFilterChange }) => {
  return (
    <div className="flex flex-wrap justify-end gap-4 mb-4">
      <div className="flex items-center gap-2">
        <FaSort className="text-blue-500" />
        <select id="sort" className="px-3 py-2 border rounded" onChange={(e) => handleSortChange(e.target.value)}>
          <option value="">Select an option</option>
          <option value="name">Nama</option>
          <option value="age">Umur</option>
          <option value="status">Status Keanggotaan</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <FaFilter className="text-blue-500" />
        <select id="filter" className="px-3 py-2 border rounded" onChange={(e) => handleFilterChange(e.target.value)}>
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
};

export default Controls;
