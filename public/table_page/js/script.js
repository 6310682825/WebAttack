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


// Event listeners
document.querySelector('#searchInput').addEventListener('input', searchUsers);
