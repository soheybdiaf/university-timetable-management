document.addEventListener('DOMContentLoaded', async function () {
  const UserId = document.getElementById('UserId'),
    StudentName = document.getElementById('studentName'),
    StudentEmail = document.getElementById('studentEmail'),
    StudentMatricule = document.getElementById('RegNumber'),
    StudentLevel = document.getElementById('LevelName'),
    StudentSpecialty = document.getElementById('SpecialtyName'),
    StudentGroupe = document.getElementById('GroupName');

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

  function submitTeachersList(TeachersS1, TeachersS2) {
    const boxS1 = document.getElementById('TeachersGroupS1'),
      boxS2 = document.getElementById('TeachersGroupS2');
    boxS1.innerHTML =
      TeachersS1?.map((teacher) => `<div class="teacher-list">${teacher}</div>`).join(
        '',
      ) || 'empty';
    boxS2.innerHTML =
      TeachersS2?.map((teacher) => `<div class="teacher-list">${teacher}</div>`).join(
        '',
      ) || 'empty';
  }

  async function GetStudentInfo() {
    const username = document.querySelector('.username').textContent;
    if (!username) return;
    const response = await fetch(
      `http://localhost:4259/Student-Dashboard/Get_student_Info/${username}`,
    );
    const StudentInfo = await response.json();
    UserId.textContent = StudentInfo.id_etudiant;
    StudentName.textContent = StudentInfo.nom_complet;
    StudentEmail.textContent = StudentInfo.email;
    StudentMatricule.textContent = StudentInfo.matricule;
    StudentLevel.textContent = StudentInfo.LevelStudent;
    StudentSpecialty.textContent = StudentInfo.Specialty;
    StudentGroupe.textContent = StudentInfo.Groupe;
    localStorage.setItem('LevelId', StudentInfo.niveau_groupe);
    localStorage.setItem('SpecialtyId', StudentInfo.specialite_groupe);
    localStorage.setItem('GroupeId', StudentInfo.id_groupe);
  }

  async function StudyStatistics() {
    const levelId = localStorage.getItem('LevelId'),
      groupId = localStorage.getItem('GroupeId');
    const response = await fetch(
      `http://localhost:4259/Student-Dashboard/get_study_summary/${levelId}/${groupId}`,
    );
    const Statistics = await response.json();
    document.getElementById('studyHoursS1').textContent = Statistics.studyHoursS1;
    document.getElementById('studyHoursS2').textContent = Statistics.studyHoursS2;
    submitTeachersList(Statistics.TeachersS1, Statistics.TeachersS2);
  }

  const generateCourseCards = (courses) =>
    courses
      .map(
        ({ nom_module, Lecture, Tutorial, Practical, Total_Hours }) =>
          `<div class="course-card">
            <h3 class="course-title">${nom_module}</h3>
            <div class="course-details">
                <div class="course-type lecture">
                <div class="course-type-header">
                    <div class="course-type-name">
                    <i class="fas fa-chalkboard-teacher"></i>Lecture</div>
                    <div class="course-hours">${Lecture} H</div>
                </div>
                </div>
                <div class="course-type tutorial">
                <div class="course-type-header">
                    <div class="course-type-name">
                    <i class="fas fa-pencil-alt"></i>Tutorial</div>
                    <div class="course-hours">${Tutorial} H</div>
                </div>
                </div>
                <div class="course-type practical">
                <div class="course-type-header">
                    <div class="course-type-name">
                    <i class="fas fa-laptop-code"></i>Practical</div>
                    <div class="course-hours">${Practical} H</div>
                </div>
                </div>
                <div class="total-hours"> Total Hours: <span class="total-hours-value">${Total_Hours}</span></div>
            </div>
         </div>`,
      )
      .join('');

  async function CoursesStatistiques() {
    const levelId = localStorage.getItem('LevelId'),
      SpecialityId = localStorage.getItem('SpecialtyId');
    const response = await fetch(
      `http://localhost:4259/Student-Dashboard/get_Courses_statistiques/${levelId}/${SpecialityId}`,
    );
    const CoursesStatistiques = await response.json();
    const { CoursesS1, CoursesS2 } = CoursesStatistiques;
    document.getElementById('CoursesCard1').innerHTML = generateCourseCards(CoursesS1);
    document.getElementById('CoursesCard2').innerHTML = generateCourseCards(CoursesS2);
  }

  async function SignOut() {
    if (confirm('Do you really want to log out')) {
      const response = await fetch(`http://localhost:4259/Auth/signout`);
      const logOut = await response.json();
      if (logOut.success) {
        localStorage.removeItem('LevelId');
        localStorage.removeItem('GroupeId');
        localStorage.removeItem('SpecialtyId');
        alert("You're successfully logged out of the account");
        location.href = logOut.redirect;
      }
    }
  }

  function displaySignOut() {
    document.querySelector('.signOut').classList.toggle('active');
  }

  document.querySelector('.signOut').addEventListener('click', SignOut);
  document.querySelector('.user-profile').addEventListener('click', displaySignOut);

  await userProfile();
  await GetStudentInfo();
  await StudyStatistics();
  await CoursesStatistiques();
});
