// Elemen untuk pesan loading dan error
const loadingMessage = document.createElement('p');
loadingMessage.textContent = 'Loading data...';
loadingMessage.className = 'text-center text-gray-500 my-4';

const errorMessage = document.createElement('p');
errorMessage.textContent = 'Error fetching data.';
errorMessage.className = 'text-center text-red-500 my-4';

// Elemen tabel
const table = document.getElementById('userTable');

// State untuk pengguna
let users = [];
let displayedUsers = [];

// Fungsi untuk menampilkan data pengguna ke dalam tabel
function displayUsers(userList) {
  table.innerHTML = '';
  userList.forEach((user, index) => {
    const row = `
            <tr>
                <td class="p-2 border">${user.name || user.login}</td>
                <td class="p-2 border">${user.email || 'N/A'}</td>
                <td class="p-2 border">${user.age || 'N/A'}</td>
                <td class="p-2 border">${user.status || 'N/A'}</td>
                <td class="p-2 border">
                    <button onclick="editUser(${index})" class="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
                    <button onclick="deleteUser(${index})" class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2">Hapus</button>
                </td>
            </tr>
        `;
    table.innerHTML += row;
  });
}

// Fungsi untuk mengambil data pengguna dari API
async function fetchUsers() {
  try {
    document.body.appendChild(loadingMessage);
    const response = await axios.get('https://api.github.com/users');
    document.body.removeChild(loadingMessage);

    users = response.data.map((user) => ({
      name: user.login,
      email: 'N/A', // GitHub API tidak menyertakan email dalam response ini
      age: 'N/A', // Placeholder karena GitHub API tidak memiliki data umur
      status: 'active', // Sebagai contoh default status
    }));

    displayedUsers = [...users];
    displayUsers(displayedUsers);
  } catch (error) {
    document.body.removeChild(loadingMessage);
    document.body.appendChild(errorMessage);
    console.error('Error fetching data:', error);
  }
}

// Inisialisasi tampilan awal
window.onload = () => {
  fetchUsers();
  displayUsers(users);
};

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
