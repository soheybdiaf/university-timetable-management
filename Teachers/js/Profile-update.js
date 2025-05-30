document.addEventListener('DOMContentLoaded', async function () {
  const UrlProfileUpdate = `http://localhost:4259/Teacher-Dashboard/profile_update`;

  const boxEdit = document.querySelector('.profile-edit'),
    formUpdate = document.getElementById('formUpdate'),
    closeFormBtn = document.getElementById('closeProfileEdit'),
    editFormBtn = document.getElementById('editProfileBtn'),
    updateStatusMsg = document.getElementById('message_updStatus');

  const Matricule = document.getElementById('Matricule'),
    fullName = document.getElementById('teacherName'),
    email = document.getElementById('teacherEmail'),
    departement = document.getElementById('Department'),
    username = document.querySelector('.username'),
    UserId = document.getElementById('UserId'),
    newPassword = document.getElementById('new_password');

  function populateForm() {
    document.getElementById('matricule').value = Matricule.textContent;
    document.getElementById('username').value = username.textContent;
    document.getElementById('fullName').value = fullName.textContent;
    document.getElementById('dprt').value = departement.textContent;
    document.getElementById('email').value = email.textContent;
  }

  function toogleFormBox(isShow) {
    boxEdit.classList.toggle('show', isShow);
    if (isShow) populateForm();
    else {
      formUpdate.reset();
      updateStatusMsg.textContent = '';
    }
  }

  async function GetProfileInfo() {
    const username = document.querySelector('.username').textContent;
    if (!username) return;
    const response = await fetch(
      `http://localhost:4259/Teacher-Dashboard/Get_teacher_Info/${username}`,
    );
    const teacherInfo = await response.json();
    fullName.textContent = teacherInfo.nom_complet;
    email.textContent = teacherInfo.email;
    UserId.textContent = teacherInfo.id_enseignant;
    Matricule.textContent = teacherInfo.matricule;
    departement.textContent = teacherInfo.departement;
  }

  async function updateProfile(e) {
    e.preventDefault();
    if (newPassword.value !== '' && newPassword.value.length < 8) {
      updateStatusMsg.textContent = 'New password must be at least 8 characters';
      return;
    }

    const formObject = Object.fromEntries(new FormData(formUpdate).entries());

    const updtOptionsRequest = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formObject),
    };
    const responce = await fetch(UrlProfileUpdate, updtOptionsRequest);
    const infoUpdated = await responce.json();

    if (infoUpdated) {
      updateStatusMsg.textContent = infoUpdated.message;
      infoUpdated.success
        ? updateStatusMsg.classList.toggle('success', true)
        : updateStatusMsg.classList.toggle('error', true);
    }

    if (infoUpdated.success) await GetProfileInfo();
  }

  editFormBtn.addEventListener('click', () => toogleFormBox(true));
  closeFormBtn.addEventListener('click', () => toogleFormBox(false));
  formUpdate.addEventListener('submit', updateProfile);
});
