document.addEventListener('DOMContentLoaded', async function () {
  const inscriptionRoute = `http://localhost:4259/inscription`,
    LoginUrl = `http://localhost:4259/Auth/SignIn`,
    teacherRegistreMsg = document.getElementById('teacherRegistreMsg'),
    studentRegistreMsg = document.getElementById('studentRegistreMsg'),
    studentLevels = document.getElementById('student-levels'),
    groupsList = document.getElementById('student-groupe');

  function loginStatus(statusOk) {
    const loginStatut = document.querySelector('.login-statut-message');
    loginStatut.classList.toggle('success', statusOk);
    loginStatut.classList.toggle('failed', !statusOk);
  }

  function registeStatus(responce, boxMsg) {
    boxMsg.textContent = responce.message;
    responce.success
      ? boxMsg.classList.toggle('success', true)
      : boxMsg.classList.toggle('error', true);
    setTimeout(() => {
      boxMsg.textContent = ``;
      boxMsg.classList = ``;
    }, 3000);
  }

  document.querySelector('#login').addEventListener('click', function () {
    document
      .querySelectorAll('.tab-btn')
      .forEach((btn) => btn.classList.remove('active'));
    document.querySelector('#register-tab').classList.remove('active');
    document.querySelector('#login-tab').classList.add('active');
    document.querySelector('#login-container').classList.add('active');
    this.classList.add('active');
  });

  document.querySelector('#register').addEventListener('click', function () {
    document
      .querySelectorAll('.tab-btn')
      .forEach((btn) => btn.classList.remove('active'));
    document
      .querySelectorAll('.form-btn')
      .forEach((btn) => btn.classList.remove('active'));
    document
      .querySelectorAll('.form-container')
      .forEach((btn) => btn.classList.remove('active'));
    document.querySelector('#login-tab').classList.remove('active');
    document.querySelector('#register-tab').classList.add('active');
    document.querySelector('#student-container').classList.add('active');
    document.querySelector('#register-student').classList.add('active');
    this.classList.add('active');
  });

  document.querySelectorAll('.form-btn').forEach((btn) =>
    btn.addEventListener('click', () => {
      document
        .querySelectorAll('.form-btn')
        .forEach((btn) => btn.classList.remove('active'));
      document
        .querySelectorAll('.form-container')
        .forEach((btn) => btn.classList.remove('active'));
      document.getElementById(btn.dataset.form).classList.add('active');
      btn.classList.add('active');
    }),
  );

  document
    .querySelector('.login-form')
    .addEventListener('submit', async function (event) {
      event.preventDefault();

      const loginStatut = document.querySelector('.login-statut-message');

      const formObjectSignIn = Object.fromEntries(new FormData(this).entries());

      const response = await fetch(LoginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formObjectSignIn),
      });

      const message = await response.json();

      if (message.text) loginStatut.textContent = message.text;

      if (message.success) {
        loginStatus(true);
        setTimeout(() => (location.href = message.redirect), 2000);
      } else loginStatus(false);
    });

  document
    .querySelector('.student-form')
    .addEventListener('submit', async function (event) {
      event.preventDefault();

      const studentInformation = Object.fromEntries(new FormData(this).entries());

      const response = await fetch(`${inscriptionRoute}/student`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentInformation),
      });

      const studentSubmited = await response.json();

      studentSubmited ? registeStatus(studentSubmited, studentRegistreMsg) : 0;
    });

  document
    .querySelector('.teacher-form')
    .addEventListener('submit', async function (event) {
      event.preventDefault();

      const teacherInformation = Object.fromEntries(new FormData(this).entries());

      const response = await fetch(`${inscriptionRoute}/teacher`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacherInformation),
      });

      const TeacherSubmited = await response.json();

      TeacherSubmited ? registeStatus(TeacherSubmited, teacherRegistreMsg) : 0;
    });

  studentLevels.addEventListener('change', async () => {
    const levelId = studentLevels.value;
    if (!levelId) return;
    const responce = await fetch(
      `http://localhost:4259/inscription/get-groupes/${levelId}`,
    );
    const groups = await responce.json();
    if (groups.length)
      groupsList.innerHTML = groups
        .map((group) => `<option value="${group.id_groupe}">${group.nom_groupe}</option>`)
        .join('');
  });
});
