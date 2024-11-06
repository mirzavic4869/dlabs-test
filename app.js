// Array data pengguna
const users = [
  { name: 'Ali', email: 'ali@example.com', age: 30, status: 'active' },
  { name: 'Budi', email: 'budi@example.com', age: 25, status: 'inactive' },
  { name: 'Citra', email: 'citra@example.com', age: 28, status: 'active' },
  { name: 'Dewi', email: 'dewi@example.com', age: 22, status: 'inactive' },
];

// Fungsi untuk menampilkan data pengguna ke dalam tabel
function displayUsers(userList) {
  const table = document.getElementById('userTable');
  table.innerHTML = '';
  userList.forEach((user) => {
    const row = `
            <tr>
                <td class="p-2 border">${user.name}</td>
                <td class="p-2 border">${user.email}</td>
                <td class="p-2 border">${user.age}</td>
                <td class="p-2 border">${user.status}</td>
            </tr>
        `;
    table.innerHTML += row;
  });
}

// Fungsi untuk mengurutkan data berdasarkan kriteria
function handleSortChange() {
  const sortCriterion = document.getElementById('sort').value;
  if (sortCriterion) {
    const sortedUsers = [...users].sort((a, b) => {
      if (sortCriterion === 'age') {
        return a.age - b.age;
      } else {
        return a[sortCriterion].localeCompare(b[sortCriterion]);
      }
    });
    displayUsers(sortedUsers);
  } else {
    displayUsers(users);
  }
}

// Fungsi untuk memfilter data berdasarkan status
function handleFilterChange() {
  const filterCriterion = document.getElementById('filter').value;
  if (filterCriterion) {
    const filteredUsers = users.filter((user) => user.status === filterCriterion);
    displayUsers(filteredUsers);
  } else {
    displayUsers(users);
  }
}

// Inisialisasi tampilan awal
window.onload = () => {
  displayUsers(users);
};
