import React from 'react';

const Controls = ({ handleSortChange, handleFilterChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-4">
      <div>
        <label htmlFor="sort" className="block mb-2 text-sm font-medium text-gray-700">
          Sorted by
        </label>
        <select id="sort" className="px-3 py-2 border rounded" onChange={(e) => handleSortChange(e.target.value)}>
          <option value="">Select an option</option>
          <option value="name">Nama</option>
          <option value="age">Umur</option>
          <option value="status">Status Keanggotaan</option>
        </select>
      </div>
      <div>
        <label htmlFor="filter" className="block mb-2 text-sm font-medium text-gray-700">
          Filtered by
        </label>
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
