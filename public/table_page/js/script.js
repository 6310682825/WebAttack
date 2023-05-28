// Sample user data
// let users = [
//   { name: 'John Doe', phoneNumber: '1234567890' },
//   { name: 'Jane Smith', phoneNumber: '9876543210' },
//   { name: 'Tom Wilson', phoneNumber: '4567891230' }
// ];

// Function to display users in the table
// function displayUsers() {
//   const tableBody = document.querySelector('#userTable tbody');
//   tableBody.innerHTML = '';

//   console.log(rows)
//   for (let row of users) {
//     const r = document.createElement('tr');
//     console.log(row)
//     row.innerHTML = `
//       <td>${row.name}</td>
//       <td>${row.number}</td>
//       <td>
//         <button class="edit-btn" onclick="editUser('${row.name}')">Edit</button>
//         <button class="delete-btn" onclick="deleteUser('${row.name}')">Delete</button>
//       </td>
//     `;
//     tableBody.appendChild(r);
//   }
// }

// Function to add a new user
// function addUser(event) {
//   event.preventDefault();

//   const form = document.querySelector('#addUserForm');
//   const nameInput = document.querySelector('#name');
//   const phoneNumberInput = document.querySelector('#phoneNumber');

//   const name = nameInput.value;
//   const phoneNumber = phoneNumberInput.value;

//   users.push({ name, phoneNumber });
//   fetch("/addUser", {
//     method: "POST",
//     body: JSON.stringify({
//       name: name,
//       phoneNumber: phoneNumber,
//     }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8"
//     }
//   })
//   form.reset();
//   hideAddUserForm();
//   // displayUsers();
// }

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
  // console.log('searchUser')
  const searchInput = document.querySelector('#searchInput');
  const searchTerm = searchInput.value.toLowerCase();
  var tr = document.getElementsByTagName('tr')
  // console.log(tr[1].getElementsByTagName('td')[0].innerHTML.toLowerCase())
  for (i = 1; i < tr.length; i++) {
    const check_name = tr[i].getElementsByTagName('td')[0].innerHTML.toLowerCase().includes(searchTerm)
    const check_owner = tr[i].getElementsByTagName('td')[1].innerHTML.toLowerCase().includes(searchTerm)
    const check_phone = tr[i].getElementsByTagName('td')[2].innerHTML.includes(searchTerm)
    if (check_name || check_phone || check_owner)
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
function editUser(id, el) {
  const row = el.parentElement.parentElement
    const newName = prompt('Enter new name:', row.children[0].innerHTML);
    const newPhoneNumber = prompt('Enter new phone number:', row.children[2].innerHTML);
    if (newName && newPhoneNumber) {
      fetch("/editUser", {
        method: "POST",
        body: JSON.stringify({
          id:id,
          name: newName,
          phoneNumber: newPhoneNumber,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(response=>response.json()).then((data)=>{
        console.log(data)
        row.children[0].innerHTML = data.name;
        row.children[2].innerHTML = data.phone;
      })
    }
}
// Function to delete a user
function deleteUser(id, el) {
  console.log(id)
  const confirmed = confirm('Are you sure you want to delete this user?');
  if (confirmed) {
    fetch("/deleteUser", {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    el.parentElement.parentElement.remove()
  }
}

// Initial display of users
// displayUsers();

// Event listeners
// document.querySelector('#addUserForm').addEventListener('submit', addUser);
document.querySelector('#searchInput').addEventListener('input', searchUsers);
// document.getElementById('addUserForm').preventDefault()
