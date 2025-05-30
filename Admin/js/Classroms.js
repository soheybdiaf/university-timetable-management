import Operation from './Class_Opreration.js';
document.addEventListener('DOMContentLoaded', async () => {
  const body = document.body;
  const baseURL = 'http://localhost:4259';
  const objectName = 'ClassRoom';
  const Route = 'rooms';
  const endsPoints = {
    GET: 'get-rooms',
    ADD: 'new_classroom',
    UPD: 'patch_classroom',
    DELL: 'delete_classroom',
  };

  const Get_Classrooms = async () => {
    const classrooms = await classroom.Fetch_All(endsPoints.GET);
    body.querySelector('#tbody').innerHTML = classrooms
      .map(
        (classroom) =>
          `<tr>
        <td>${classroom.id_salle}</td>
        <td>${classroom.nom_salle}</td>
        <td>${classroom.bloc_salle}</td>
        <td>${classroom.type_salle}</td>
        <td><button class="btn-update" data-id="${classroom.id_salle}">✍️</button></td>
        <td><button class="btn-delete" data-id="${classroom.id_salle}">❌</button></td>
        </tr>`,
      )
      .join('');
    classroom.modal.classList.contains('show') ? classroom.toggle_Modal_State(true) : 0;
  };

  const classroom = new Operation(
    objectName,
    baseURL,
    Route,
    endsPoints,
    Get_Classrooms,
    body,
  );

  await classroom.data();
});
