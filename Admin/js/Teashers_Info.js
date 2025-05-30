document.addEventListener('DOMContentLoaded', async () => {
  const body = document.body,
    modal = body.querySelector('.modal-box-3'),
    assignedSubjects = body.querySelector('#box_subjects_assigned'),
    closeModal = body.querySelector('#close_modal_3'),
    tableBody = body.querySelector('#tbody'),
    baseURL = 'http://localhost:4259/Teachers',
    deleteURL = 'http://localhost:4259/Teachers_Subjects/delete_teachers_subject';

  const fetchData = async (url, options = {}) =>
    await fetch(url, options).then((response) => response.json());

  const toggleModal = (isOpen) => {
    document
      .querySelectorAll(
        '.btn-delete, .btn-update, .add_data, .assign_Subjects, .btn-info',
      )
      .forEach((btn) => (btn.disabled = isOpen));
    modal.classList.toggle('show_info', isOpen);
    !isOpen ? setTimeout(() => (assignedSubjects.textContent = ''), 500) : 0;
  };

  const loadTeacherInfo = async (event) => {
    const button = event.target.closest('.btn-info');
    if (!button) return;

    toggleModal(true);
    const IdTeacher = button.dataset.id;
    const subjects = await fetchData(`${baseURL}/get-teachers-info/${IdTeacher}`);

    assignedSubjects.innerHTML = !subjects.message
      ? subjects.array
          .map(
            ({ nom_module, type_module, nom_niveau, module_id }) => `
          <tr data-id-teacher="${IdTeacher}">
            <td class="bg-gray-200 text-teal-800">${nom_module}</td>
            <td>${type_module}</td>
            <td>${nom_niveau}</td>
            <td><button class="delete-subjects" data-id-subject="${module_id}">❌</button></td>
          </tr>`,
          )
          .join('')
      : (assignedSubjects.textContent = subjects.message);
  };

  const deleteSubject = async (event) => {
    const button = event.target.closest('.delete-subjects');
    if (!button) return;

    const row = button.closest('tr'),
      IdTeacher = row.dataset.idTeacher,
      IdSubject = button.dataset.idSubject,
      subjectName = row.cells[0].textContent,
      TypeSubject = row.cells[1].textContent;

    if (confirm(`Do you want to delete the subject ${subjectName}?`)) {
      const response = await fetchData(
        `${deleteURL}?idTeacher=${IdTeacher}&idSubject=${IdSubject}&type=${TypeSubject}`,
        { method: 'DELETE' },
      );
      if (response.isSuccess) row.remove();
    }
  };

  tableBody.addEventListener('click', loadTeacherInfo);
  assignedSubjects.addEventListener('click', deleteSubject);
  closeModal.addEventListener('click', () => toggleModal(false));
});
