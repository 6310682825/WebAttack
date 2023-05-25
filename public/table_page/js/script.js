// Sample user data
let users = [
  { name: 'John Doe', phoneNumber: '1234567890' },
  { name: 'Jane Smith', phoneNumber: '9876543210' },
  { name: 'Tom Wilson', phoneNumber: '4567891230' }
];

// Function to display users in the table
function displayUsers() {
  const tableBody = document.querySelector('#userTable tbody');
  tableBody.innerHTML = '';

  for (let user of users) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.phoneNumber}</td>
      <td>
        <button class="edit-btn" onclick="editUser('${user.name}')">Edit</button>
        <button class="delete-btn" onclick="deleteUser('${user.name}')">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  }
}

// Function to add a new user
function addUser(event) {
  event.preventDefault();

  const form = document.querySelector('#addUserForm');
  const nameInput = document.querySelector('#name');
  const phoneNumberInput = document.querySelector('#phoneNumber');

  const name = nameInput.value;
  const phoneNumber = phoneNumberInput.value;

  users.push({ name, phoneNumber });
  fetch("/addUser", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      phoneNumber: phoneNumber,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });
  form.reset();
  hideAddUserForm();
  displayUsers();
}

// Function to show the "Add User" form
function showAddUserForm() {
  const modal = document.querySelector('#addUserModal');
  modal.style.display = 'block';
}

// Function to hide the "Add User" form
function hideAddUserForm() {
  const modal = document.querySelector('#addUserModal');
  modal.style.display = 'none';
}

// Function to search for users
function searchUsers() {
  const searchInput = document.querySelector('#searchInput');
  const searchTerm = searchInput.value.toLowerCase();
  var tr = document.getElementsByTagName('tr')
  // console.log(tr[1].getElementsByTagName('td')[0].innerHTML.toLowerCase())
  for (i = 1; i < tr.length; i++) {
    const check_name = tr[i].getElementsByTagName('td')[0].innerHTML.toLowerCase().includes(searchTerm)
    const check_phone = tr[i].getElementsByTagName('td')[1].innerHTML.includes(searchTerm)
    if (check_name || check_phone)
      tr[i].style.display = ""
    else tr[i].style.display = "none"
  }
  // const filteredUsers = users.filter(user =>
  //   user.name.toLowerCase().includes(searchTerm) ||
  //   user.phoneNumber.includes(searchTerm)
  // );

  // displayUsers(filteredUsers);
}

// Function to edit a user
function editUser(name) {
  const user = users.find(user => user.name === name);

  if (user) {
    const newName = prompt('Enter new name:', user.name);
    const newPhoneNumber = prompt('Enter new phone number:', user.phoneNumber);

    if (newName && newPhoneNumber) {
      user.name = newName;
      user.phoneNumber = newPhoneNumber;
      fetch("/editUser", {
        method: "POST",
        body: JSON.stringify({
          name: newName,
          phoneNumber: newPhoneNumber,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      displayUsers();
    }
  }
}

// Function to delete a user
function deleteUser(name) {
  const confirmed = confirm('Are you sure you want to delete this user?');

  if (confirmed) {
    users = users.filter(user => user.name !== name);
    fetch("/deleteUser", {
      method: "POST",
      body: JSON.stringify({
        name: name,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    displayUsers();
  }
}

// Initial display of users
displayUsers();

// Event listeners
document.querySelector('#addUserForm').addEventListener('submit', addUser);
document.querySelector('#searchInput').addEventListener('input', searchUsers);
