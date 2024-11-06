// Array data pengguna
let users = [
  { name: 'Ali', email: 'ali@example.com', age: 30, status: 'active' },
  { name: 'Budi', email: 'budi@example.com', age: 25, status: 'inactive' },
  { name: 'Citra', email: 'citra@example.com', age: 28, status: 'active' },
  { name: 'Dewi', email: 'dewi@example.com', age: 22, status: 'inactive' },
];

// Menyimpan data yang ditampilkan setelah filter/sort
let displayedUsers = [...users];

// Fungsi untuk menampilkan data pengguna ke dalam tabel
function displayUsers(userList) {
  const table = document.getElementById('userTable');
  table.innerHTML = '';
  userList.forEach((user, index) => {
    const row = `
            <tr>
                <td class="p-2 border">${user.name}</td>
                <td class="p-2 border">${user.email}</td>
                <td class="p-2 border">${user.age}</td>
                <td class="p-2 border">${user.status}</td>
                <td class="p-2 border">
                    <button onclick="editUser(${index})" class="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
                    <button onclick="deleteUser(${index})" class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2">Hapus</button>
                </td>
            </tr>
        `;
    table.innerHTML += row;
  });
}

// Fungsi untuk menambahkan/memperbarui data pengguna
document.getElementById('userForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const age = parseInt(document.getElementById('age').value);
  const status = document.getElementById('status').value;
  const userIndex = document.getElementById('userIndex').value;

  // Validasi email
  if (!/\S+@\S+\.\S+/.test(email)) {
    alert('Email tidak valid!');
    return;
  }

  if (userIndex) {
    // Update pengguna
    displayedUsers[userIndex] = { name, email, age, status };
  } else {
    // Tambah pengguna baru
    displayedUsers.push({ name, email, age, status });
  }

  users = [...displayedUsers];
  displayUsers(users);
  resetForm();
});

// Fungsi untuk mengedit data pengguna
function editUser(index) {
  const user = displayedUsers[index];
  document.getElementById('name').value = user.name;
  document.getElementById('email').value = user.email;
  document.getElementById('age').value = user.age;
  document.getElementById('status').value = user.status;
  document.getElementById('userIndex').value = index;
}

// Fungsi untuk menghapus pengguna
function deleteUser(index) {
  displayedUsers.splice(index, 1);
  users = [...displayedUsers];
  displayUsers(users);
}

// Fungsi untuk mereset form
function resetForm() {
  document.getElementById('userForm').reset();
  document.getElementById('userIndex').value = '';
}

// Fungsi untuk mengurutkan data berdasarkan kriteria
function handleSortChange() {
  const sortCriterion = document.getElementById('sort').value;
  if (sortCriterion) {
    displayedUsers.sort((a, b) => {
      if (sortCriterion === 'age') {
        return a.age - b.age;
      } else {
        return a[sortCriterion].localeCompare(b[sortCriterion]);
      }
    });
    displayUsers(displayedUsers);
  } else {
    displayUsers(users);
  }
}

// Fungsi untuk memfilter data berdasarkan status
function handleFilterChange() {
  const filterCriterion = document.getElementById('filter').value;
  if (filterCriterion) {
    displayedUsers = users.filter((user) => user.status === filterCriterion);
  } else {
    displayedUsers = [...users];
  }
  displayUsers(displayedUsers);
}

// Inisialisasi tampilan awal
window.onload = () => {
  displayUsers(users);
};
