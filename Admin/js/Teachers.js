import Operation from './Class_Opreration.js';
document.addEventListener('DOMContentLoaded', async () => {
  const body = document.body;
  const baseUrl = 'http://localhost:4259';
  const objectName = 'Teacher';
  const Route = 'Teachers';
  const endsPoints = {
    GET: 'get-teachers',
    ADD: 'new_teacher',
    UPD: 'patch_teacher',
    DELL: 'delete_teacher',
  };

  const Get_Teachers = async () => {
    const Teachers = await teacher.Fetch_All(endsPoints.GET);
    body.querySelector('#tbody').innerHTML = Teachers.map(
      (teacher) =>
        `<tr>
          <th><input name="checkbox" type="checkbox"></th>
          <td>${teacher.id_enseignant}</td>
          <td>${teacher.matricule}</td>
          <td>${teacher.nom_complet}</td>
          <td>${teacher.email}</td>
          <td>${teacher.module_preferes || 'Not reserved'}</td>
          <td><button class="btn-info" data-id="${teacher.id_enseignant}">🔍</button></td>
          <td><button class="btn-update" data-id="${teacher.id_enseignant}">✍️</button></td>
          <td><button class="btn-delete" data-id="${teacher.id_enseignant}">❌</button></td>
          </tr>`,
    ).join(``);
    teacher.modal.classList.contains('show') ? teacher.toggle_Modal_State(true) : 0;
  };

  const teacher = new Operation(
    objectName,
    baseUrl,
    Route,
    endsPoints,
    Get_Teachers,
    body,
  );

  await teacher.data();
});
