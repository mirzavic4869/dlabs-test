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
let users = []; // Array untuk menyimpan semua data pengguna
let displayedUsers = []; // Array untuk menyimpan data pengguna yang ditampilkan

// Fungsi untuk menyimpan data ke localStorage
function saveToLocalStorage() {
  localStorage.setItem('users', JSON.stringify(users)); // Simpan data ke localStorage dalam format JSON
}

// Fungsi untuk memuat data dari localStorage
function loadFromLocalStorage() {
  const storedUsers = localStorage.getItem('users');
  if (storedUsers) {
    users = JSON.parse(storedUsers); // Parse data JSON menjadi array JavaScript
    displayedUsers = [...users]; // Salin data ke displayedUsers untuk ditampilkan
  }
}

// Fungsi untuk menampilkan data pengguna ke dalam tabel
function displayUsers(userList) {
  table.innerHTML = ''; // Hapus konten tabel sebelum menambahkan data baru
  userList.forEach((user, index) => {
    // Buat baris tabel untuk setiap pengguna
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
    table.innerHTML += row; // Tambahkan baris ke tabel
  });
}

// Fungsi untuk mengambil data pengguna dari API eksternal
async function fetchUsers() {
  try {
    document.body.appendChild(loadingMessage); // Tampilkan pesan loading
    const response = await axios.get('https://api.github.com/users'); // Ambil data dari API GitHub
    document.body.removeChild(loadingMessage); // Hapus pesan loading setelah selesai

    users = response.data.map((user) => ({
      // Data diubah agar sesuai dengan struktur aplikasi
      name: user.login,
      email: 'N/A', // Placeholder karena GitHub API tidak menyertakan email
      age: 'N/A', // Placeholder karena tidak ada data umur di GitHub API
      status: 'active', // Status default pengguna
    }));

    displayedUsers = [...users]; // Salin data untuk ditampilkan
    saveToLocalStorage(); // Simpan data ke localStorage
    displayUsers(displayedUsers); // Tampilkan data di tabel
  } catch (error) {
    document.body.removeChild(loadingMessage); // Hapus pesan loading
    document.body.appendChild(errorMessage); // Tampilkan pesan error
    alert('Error fetching data. Please try again later.'); // Notifikasi error ke pengguna
    console.error('Error fetching data:', error); // Log error di konsol
  }
}

// Inisialisasi tampilan awal
window.onload = () => {
  loadFromLocalStorage(); // Muat data dari localStorage jika ada
  if (users.length > 0) {
    displayUsers(users); // Tampilkan data yang dimuat dari localStorage
  } else {
    fetchUsers(); // Ambil data dari API jika tidak ada data di localStorage
  }
};

// Fungsi untuk menambahkan/memperbarui data pengguna melalui form
document.getElementById('userForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Mencegah pengiriman form standar
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const age = parseInt(document.getElementById('age').value);
  const status = document.getElementById('status').value;
  const userIndex = document.getElementById('userIndex').value;

  // Validasi email
  if (!/\S+@\S+\.\S+/.test(email)) {
    alert('Email tidak valid!');
    return; // Keluar dari fungsi jika email tidak valid
  }

  if (userIndex) {
    // Update pengguna jika indeks ada
    displayedUsers[userIndex] = { name, email, age, status };
  } else {
    // Tambah pengguna baru jika indeks kosong
    displayedUsers.push({ name, email, age, status });
  }

  users = [...displayedUsers]; // Perbarui array users
  saveToLocalStorage(); // Simpan data ke localStorage
  displayUsers(users); // Tampilkan data baru di tabel
  resetForm(); // Reset form setelah submit
});

// Fungsi untuk mengedit data pengguna
function editUser(index) {
  const user = displayedUsers[index];
  document.getElementById('name').value = user.name;
  document.getElementById('email').value = user.email;
  document.getElementById('age').value = user.age;
  document.getElementById('status').value = user.status;
  document.getElementById('userIndex').value = index; // Simpan indeks untuk pembaruan
}

// Fungsi untuk menghapus pengguna
function deleteUser(index) {
  displayedUsers.splice(index, 1); // Hapus pengguna dari array
  users = [...displayedUsers]; // Perbarui array users
  saveToLocalStorage(); // Simpan data ke localStorage
  displayUsers(users); // Tampilkan data yang diperbarui
}

// Fungsi untuk mereset form input
function resetForm() {
  document.getElementById('userForm').reset(); // Reset semua input form
  document.getElementById('userIndex').value = ''; // Hapus indeks pengguna
}

// Fungsi untuk mengurutkan data berdasarkan kriteria yang dipilih
function handleSortChange() {
  const sortCriterion = document.getElementById('sort').value;
  if (sortCriterion) {
    displayedUsers.sort((a, b) => {
      if (sortCriterion === 'age') {
        return a.age - b.age;
      } else {
        return a[sortCriterion].localeCompare(b[sortCriterion]); // Sortir alfabetis
      }
    });
    displayUsers(displayedUsers); // Tampilkan data yang diurutkan
  } else {
    displayUsers(users); // Tampilkan data asli jika tidak dipilih
  }
}

// Fungsi untuk memfilter data berdasarkan status
function handleFilterChange() {
  const filterCriterion = document.getElementById('filter').value;
  if (filterCriterion) {
    displayedUsers = users.filter((user) => user.status === filterCriterion); // Filter data sesuai kriteria
  } else {
    displayedUsers = [...users]; // Tampilkan semua data jika tidak dipilih
  }
  displayUsers(displayedUsers); // Tampilkan data yang difilter
}
