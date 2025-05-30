document.addEventListener('DOMContentLoaded', async function () {
  const Username = document.querySelector('.username'),
    UserRole = document.querySelector('.user-role'),
    IconContainer = document.querySelector('.user-avatar'),
    AdminIcon = `<i class="fa-solid fa-user-tie"></i>`,
    TeacherIcon = `<i class="fa-solid fa-person-chalkboard"></i>`,
    StudentIcon = `<i class="fa-solid fa-graduation-cap"></i>`;
  const response = await fetch(`http://localhost:4259/profile`);
  const UserInfo = await response.json();
  Username.textContent = UserInfo.name;
  UserRole.textContent = UserInfo.Role;
  IconContainer.innerHTML =
    UserInfo.Role == 'admin'
      ? AdminIcon
      : UserInfo.Role == 'Teacher'
        ? TeacherIcon
        : StudentIcon;
});
