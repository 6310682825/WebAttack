// ตารางแสดงข้อมูลผู้ใช้
var userTable = document.getElementById('userTable');

// ฟอร์มเพิ่มข้อมูลผู้ใช้
var userForm = document.getElementById('userForm');
var nameInput = document.getElementById('name');
var phoneInput = document.getElementById('phone');

// ข้อมูลผู้ใช้เริ่มต้น
var users = [
  { name: 'John Doe', phone: '1111111111' },
  { name: 'Jane Smith', phone: '2222222222' },
  { name: 'Bob Johnson', phone: '3333333333' },
  // เพิ่มข้อมูลผู้ใช้เริ่มต้นได้ตรงนี้
];

// แสดงข้อมูลผู้ใช้ในตาราง
function displayUsers() {
  // ล้างข้อมูลในตารางทั้งหมด
  while (userTable.rows.length > 1) {
    userTable.deleteRow(1);
  }

  // สร้างแถวสำหรับแสดงข้อมูลผู้ใช้ในตาราง
  for (var i = 0; i < users.length; i++) {
    var user = users[i];

    var row = userTable.insertRow(i + 1);
    var nameCell = row.insertCell(0);
    var phoneCell = row.insertCell(1);
    var editCell = row.insertCell(2);
    var deleteCell = row.insertCell(3);

    nameCell.innerHTML = user.name;
    phoneCell.innerHTML = user.phone;

  // สร้างปุ่มแก้ไข
  var editButton = document.createElement('button');
  editButton.innerHTML = 'แก้ไข';
  editButton.setAttribute('data-index', i);
  editButton.classList.add('button-primary'); // เพิ่มคลาส 'button-primary' เพื่อกำหนดสไตล์
  editButton.addEventListener('click', editUser);
  editCell.appendChild(editButton);

  // สร้างปุ่มลบ
  var deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'ลบ';
  deleteButton.setAttribute('data-index', i);
  deleteButton.classList.add('button-danger'); // เพิ่มคลาส 'button-danger' เพื่อกำหนดสไตล์
  deleteButton.addEventListener('click', deleteUser);
  deleteCell.appendChild(deleteButton);
  }
}

// เพิ่มข้อมูลผู้ใช้
function addUser(event) {
  event.preventDefault(); // หยุดการส่งฟอร์ม

  var name = nameInput.value;
  var phone = phoneInput.value;

  // ตรวจสอบความถูกต้องของข้อมูล
  if (name.trim() === '' || phone.trim() === '') {
    alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    return;
  }

  // เพิ่มข้อมูลผู้ใช้ในรายการ
  users.push({ name: name, phone: phone });

  // ล้างฟอร์ม
  nameInput.value = '';
  phoneInput.value = '';

  // แสดงข้อมูลผู้ใช้ในตารางใหม่
  displayUsers();
}

// แก้ไขข้อมูลผู้ใช้
function editUser(event) {
  var index = parseInt(event.target.getAttribute('data-index'));

  // แสดงข้อมูลผู้ใช้ที่ต้องการแก้ไขในฟอร์ม
  var user = users[index];
  nameInput.value = user.name;
  phoneInput.value = user.phone;

  // ลบข้อมูลผู้ใช้เดิม
  users.splice(index, 1);

  // แสดงข้อมูลผู้ใช้ในตารางใหม่
  displayUsers();
}

// ลบข้อมูลผู้ใช้
function deleteUser(event) {
  var index = parseInt(event.target.getAttribute('data-index'));

  // ลบข้อมูลผู้ใช้
  users.splice(index, 1);

  // แสดงข้อมูลผู้ใช้ในตารางใหม่
  displayUsers();
}

// เริ่มต้นแสดงข้อมูลผู้ใช้ในตาราง
displayUsers();

// เพิ่มการฟังก์ชันในการส่งฟอร์ม
userForm.addEventListener('submit', addUser);
