import Operation from './Class_Opreration.js';
document.addEventListener('DOMContentLoaded', async () => {
  const body = document.body;
  const listLevels = body.querySelector('#levels');
  const groupsList = body.querySelector('#group');
  const baseURL = 'http://localhost:4259';
  const objectName = 'Student';
  const Route = 'students';
  const endsPoints = {
    GET: 'get-students',
    ADD: 'new_student',
    UPD: 'patch_student',
    DELL: 'delete_student',
  };
  const Fetch_Groups = async (levelId) =>
    fetch(`${baseURL}/inscription/get-groupes/${levelId}`).then((response) =>
      response.json(),
    );

  const Get_Students = async () => {
    const students = await student.Fetch_All(endsPoints.GET);
    body.querySelector('#tbody').innerHTML = students
      .map(
        (student) =>
          `<tr>
        <td>${student.id_etudiant}</td>
        <td>${student.matricule}</td>
        <td>${student.nom_complet}</td>
        <td>${student.email}</td>
        <td>${student.username}</td>
        <td>${student.nom_niveau}</td>
        <td>${student.nom_groupe}</td>
        <td><button class="btn-update" data-id="${student.id_etudiant}">✍️</button></td>
        <td><button class="btn-delete" data-id="${student.id_etudiant}">❌</button></td>
        </tr>`,
      )
      .join('');
    student.modal.classList.contains('show') ? student.toggle_Modal_State(true) : 0;
  };

  listLevels.addEventListener('change', async () => {
    const levelId = listLevels.value;
    const groups = await Fetch_Groups(levelId);
    groupsList.innerHTML = groups
      .map((group) => `<option value="${group.id_groupe}">${group.nom_groupe}</option>`)
      .join('');
  });

  const student = new Operation(
    objectName,
    baseURL,
    Route,
    endsPoints,
    Get_Students,
    body,
  );

  await student.data();
});
