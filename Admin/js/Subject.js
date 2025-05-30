import Operation from './Class_Opreration.js';
document.addEventListener('DOMContentLoaded', async () => {
  const body = document.body;
  const baseURL = 'http://localhost:4259';
  const objectName = 'subject';
  const Route = 'Subjects';
  const endsPoints = {
    GET: 'get-subject',
    ADD: 'new_subject',
    UPD: 'patch_subject',
    DELL: 'delete_subject',
  };

  const Get_Subjects = async () => {
    const subjects = await subject.Fetch_All(endsPoints.GET);
    body.querySelector('#tbody').innerHTML = subjects
      .map(
        (subject) =>
          `<tr>
        <td>${subject.id_module}</td>
        <td>${subject.nom_module}</td>
        <td>${subject.semester_module}</td>
        <td>${subject.nom_niveau}</td>
        <td>${subject.nom_specialite}</td>
        <td>${subject.nombre_td}</td>
        <td>${subject.nombre_tp}</td>
        <td>${subject.nombre_cours}</td>
        <td><button class="btn-update" data-id="${subject.id_module}">✍️</button></td>
        <td><button class="btn-delete" data-id="${subject.id_module}">❌</button></td>
        </tr>`,
      )
      .join(``);
    subject.modal.classList.contains('show') ? subject.toggle_Modal_State(true) : 0;
  };

  const subject = new Operation(
    objectName,
    baseURL,
    Route,
    endsPoints,
    Get_Subjects,
    body,
  );

  await subject.data();
});
