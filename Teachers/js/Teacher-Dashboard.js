document.addEventListener('DOMContentLoaded', async function () {
  const TeacherName = document.getElementById('teacherName'),
    TeacherEmail = document.getElementById('teacherEmail'),
    UserId = document.getElementById('UserId'),
    Matricule = document.getElementById('Matricule'),
    Department = document.getElementById('Department');

  const searchInput = document.getElementById('courseInput'),
    courseTags = document.getElementById('courseTags'),
    coursesList = document.getElementById('courses-list');

  const TimesPreferencesBox = document.getElementById('TimesPreferencesMsg'),
    ModulesPreferencesBox = document.getElementById('ModulesPreferencesMsg');

  function showServerResponceMsg(responce, boxMsg) {
    boxMsg.textContent = responce.message;
    responce.success
      ? boxMsg.classList.toggle('success', true)
      : boxMsg.classList.toggle('error', true);
    setTimeout(() => (boxMsg.textContent = ``), 3000);
  }

  function GetPreferencesTimes({ jours_preferes, horaires_preferes }) {
    if (!jours_preferes && horaires_preferes) return;
    const Times = [...jours_preferes.split(','), ...horaires_preferes.split(',')];
    document.querySelectorAll('[type=checkbox]').forEach((checkbox) => {
      checkbox.checked = [...Times].includes(checkbox.value);
    });
  }

  async function userProfile() {
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
  }

  async function GetTeacherInfo() {
    const username = document.querySelector('.username').textContent;
    if (!username) return;
    const response = await fetch(
      `http://localhost:4259/Teacher-Dashboard/Get_teacher_Info/${username}`,
    );
    const teacherInfo = await response.json();
    TeacherName.textContent = teacherInfo.nom_complet;
    TeacherEmail.textContent = teacherInfo.email;
    UserId.textContent = teacherInfo.id_enseignant;
    Matricule.textContent = teacherInfo.matricule;
    Department.textContent = teacherInfo.departement;
    GetPreferencesTimes(teacherInfo);
  }

  function submitTeachingModules(module_S1, module_S2) {
    const modules_S1 = document.getElementById('teachingModulesS1'),
      modules_S2 = document.getElementById('teachingModulesS2');
    modules_S1.innerHTML =
      module_S1
        ?.map(({ nom_module }) => `<div class="module-list">${nom_module}</div>`)
        .join('') || 0;
    modules_S2.innerHTML =
      module_S2
        ?.map(({ nom_module }) => `<div class="module-list">${nom_module}</div>`)
        .join('') || 0;
  }

  function submitTeachingGroupes(module_S1, module_S2) {
    const groupes_S1 = document.getElementById('teachingGroupsS1'),
      groupes_S2 = document.getElementById('teachingGroupsS2');
    groupes_S1.innerHTML =
      module_S1
        ?.map(({ nom_groupe }) => `<div class="group-list">${nom_groupe}</div>`)
        .join('') || 0;
    groupes_S2.innerHTML =
      module_S2
        ?.map(({ nom_groupe }) => `<div class="group-list">${nom_groupe}</div>`)
        .join('') || 0;
  }

  async function TeachingStatistics() {
    const teacherId = UserId.textContent;
    const response = await fetch(
      `http://localhost:4259/Teacher-Dashboard/Get_teacher_Statistics/${teacherId}`,
    );
    const Statistics = await response.json();
    document.getElementById('teachingHoursS1').textContent = Statistics.teaching_Hours_S1;
    document.getElementById('teachingHoursS2').textContent = Statistics.teaching_Hours_S2;
    submitTeachingModules(Statistics['module_S1'], Statistics['module_S2']);
    submitTeachingGroupes(Statistics['group_Count_S1'], Statistics['group_Count_S2']);
  }

  async function submitTimesPreferences(e) {
    e.preventDefault();
    const formdataTimes = new FormData(this);
    const timePreferencesObject = {
      teacherId: UserId.textContent,
      jours_preferes: formdataTimes.getAll('jours_preferes'),
      horaires_preferes: formdataTimes.getAll('horaires_preferes'),
    };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(timePreferencesObject),
    };
    const response = await fetch(
      `http://localhost:4259/Teacher-Dashboard/Post_Preferences_Times`,
      options,
    );
    const responceObject = await response.json();
    responceObject ? showServerResponceMsg(responceObject, TimesPreferencesBox) : 0;
  }

  async function GetCoursesPreferences() {
    const teachetId = UserId.textContent;
    const response = await fetch(
      `http://localhost:4259/Teacher-Dashboard/Get_Preferences_Module/${teachetId}`,
    );
    if (!response.ok) return;
    const module = await response.json();
    courseTags.innerHTML = module
      ?.map(({ module_preferes }) =>
        module_preferes != ''
          ? `<span class="course-tag">${module_preferes}</span>`
          : `empty List`,
      )
      .join();
  }

  async function submitCoursesPreferences() {
    const modulePreferencesObject = {
      teacherId: UserId.textContent,
      module: searchInput.value,
    };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(modulePreferencesObject),
    };
    const response = await fetch(
      `http://localhost:4259/Teacher-Dashboard/Post_Preferences_Module`,
      options,
    );
    const responceObject = await response.json();
    responceObject ? showServerResponceMsg(responceObject, ModulesPreferencesBox) : 0;
    searchInput.value = ``;
    await GetCoursesPreferences();
  }

  async function SignOut() {
    if (confirm('Do you really want to log out')) {
      const response = await fetch(`http://localhost:4259/Auth/signout`);
      const logOut = await response.json();
      if (logOut.success) {
        alert("You're successfully logged out of the account");
        location.href = logOut.redirect;
      }
    }
  }

  function displaySignOut() {
    document.querySelector('.signOut').classList.toggle('active');
  }

  searchInput.addEventListener('input', async () => {
    const query = searchInput.value.trim();
    if (query == ``) {
      coursesList.innerHTML = ``;
      return;
    }

    const response = await fetch(
      `http://localhost:4259/Teacher-Dashboard/search_modules?query=${query}`,
    );
    const list = await response.json();
    coursesList.innerHTML = '';

    if (list.length) {
      list.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item.nom_module;
        li.addEventListener('click', () => {
          if (li.textContent != 'No match') searchInput.value = item.nom_module;
          coursesList.innerHTML = '';
        });
        coursesList.appendChild(li);
      });
    } else coursesList.textContent = 'No match';

    searchInput.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  });

  document.addEventListener('click', (e) =>
    e.target !== searchInput ? (coursesList.innerHTML = '') : 0,
  );
  document.querySelector('.signOut').addEventListener('click', SignOut);
  document.querySelector('.user-profile').addEventListener('click', displaySignOut);
  document
    .querySelector('.timePreferences')
    .addEventListener('submit', submitTimesPreferences);
  document
    .querySelectorAll('[type=checkbox]:checked')
    .forEach((checkbox) => (checkbox.checked = false));
  document
    .getElementById('submitCoursesPreferences')
    .addEventListener('click', submitCoursesPreferences);

  await userProfile();
  await GetTeacherInfo();
  await TeachingStatistics();
  await GetCoursesPreferences();
});
