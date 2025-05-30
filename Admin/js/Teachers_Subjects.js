document.addEventListener('DOMContentLoaded', async () => {
  const modal = document.querySelector('.modal-box-2'),
    formsContainer = document.getElementById('forms_container'),
    addSubjectBtn = document.querySelector('.assign_Subjects'),
    closeModalBtn = document.querySelector('#close_modal_2'),
    messageBox = document.getElementById('message-2'),
    submitBtn = document.getElementById('submit_2'),
    tableBody = document.getElementById('tbody'),
    baseURL = 'http://localhost:4259/Teachers_Subjects';

  const fetchData = async (url, options = {}) =>
    fetch(url, options).then((response) => response.json());

  const createForm = (teacherId, teacherName) => {
    const form = document.createElement('form');
    form.innerHTML = `
    <input type="text" name="teacher_name" value="${teacherName}" readonly>
    <select id="semestre" name="semester_module" required>
    <option value="">-semester-</option>
    <option value="1">S1</option>
    <option value="2">S2</option></select>
    <select id="levels" name="niveau_module" required>
    <option value="">-level-</option>
    <option value="1">LICENCE 1</option>
    <option value="2">LICENCE 2</option>
    <option value="3">LICENCE 3</option>
    <option value="4">MASTER 1</option>
    <option value="5">MASTER 2</option></select>
    <select data-teacher-id="${teacherId}" class="modules" name="module_id"></select>
    <div class="checkbox_container"><span>Subject Types</span></div>`;
    return form;
  };

  const appendForms = () => {
    const fragment = document.createDocumentFragment();
    tableBody.querySelectorAll('[type=checkbox]:checked').forEach((checkbox) => {
      const row = checkbox.closest('tr');
      fragment.appendChild(
        createForm(row.cells[1].textContent, row.cells[3].textContent),
      );
    });
    formsContainer.appendChild(fragment);
  };

  const updateSubjectsDropdown = async () => {
    formsContainer.querySelectorAll('#semestre, #levels').forEach((select) => {
      select.addEventListener('change', () => {
        const form = select.closest('form');
        form.querySelector('.modules').innerHTML = `<option value="">-subject-</option>`;
      });
    });

    formsContainer.querySelectorAll('.modules').forEach((select) => {
      const form = select.closest('form'),
        semestre = form.querySelector('#semestre'),
        level = form.querySelector('#levels');
      select.addEventListener('click', async () => {
        if (!level || !semestre || select.children.length > 1) return;
        const subjects = await fetchData(
          `${baseURL}/get_subject_by_level?semestre=${semestre.value}&level=${level.value}`,
        );
        select.innerHTML += subjects
          .map(
            ({ id_module, nom_module }) =>
              `<option value="${id_module}">${nom_module}</option>`,
          )
          .join('');
      });

      select.addEventListener('change', async () => {
        const checkboxContainer = select.nextElementSibling;
        checkboxContainer.textContent = '';
        if (select.value) {
          const types = await fetchData(
            `${baseURL}/get_types_subject?ID_TEACHER=${select.dataset.teacherId}&ID_SUBJECT=${select.value}`,
          );
          checkboxContainer.innerHTML = types.length
            ? types
                .map(
                  (type) =>
                    `<label><input type="checkbox" name="type_module" value="${type}"> ${type}</label>`,
                )
                .join('')
            : 'Not Available';
        }
      });
    });
  };

  const showMessage = (message, isSuccess) => {
    messageBox.textContent = message;
    messageBox.style.color = isSuccess ? '#198754' : '#b02a37';
    setTimeout(() => (messageBox.textContent = ''), 5000);
  };

  const isValidSubmission = () =>
    [...formsContainer.querySelectorAll('.checkbox_container')].every((container) =>
      container.querySelector('input:checked'),
    );

  const toggleModal = (isOpen) => {
    modal.classList.toggle('show', isOpen);
    document
      .querySelectorAll(
        '.btn-delete, .btn-update, .btn-info, .add_data, .assign_Subjects',
      )
      .forEach((btn) => (btn.disabled = isOpen));
    if (!isOpen)
      setTimeout(() => (formsContainer.innerHTML = messageBox.textContent = ''), 500);
  };

  addSubjectBtn.addEventListener('click', async () => {
    toggleModal(true);
    appendForms();
    await updateSubjectsDropdown();
  });

  submitBtn.addEventListener('click', async () => {
    if (!isValidSubmission())
      return showMessage('Please check at least one checkbox for each teacher.', false);

    const formDataArray = [...formsContainer.querySelectorAll('form')].flatMap((form) => {
      const teacherId = form.querySelector('.modules').dataset.teacherId,
        subjectId = form.querySelector('.modules').value;
      return [...form.querySelectorAll('[name=type_module]:checked')].map((input) => [
        teacherId,
        subjectId,
        input.value,
      ]);
    });

    const response = await fetchData(`${baseURL}/add_subjects_teachers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ array: formDataArray }),
    });

    if (response.isSuccess) {
      formsContainer.querySelectorAll('.modules').forEach((select) => {
        console.log(select.selectedIndex);
        select.remove(select.selectedIndex);
        select.nextElementSibling.textContent = '';
      });
    }

    showMessage(response.message, response.isSuccess);
  });

  closeModalBtn.addEventListener('click', () => toggleModal(false));

  tableBody.addEventListener('click', (e) => {
    if (e.target.type === 'checkbox') {
      document.querySelector('#no_teacher_selected').textContent = [
        ...tableBody.querySelectorAll('[type="checkbox"]:checked'),
      ].length
        ? ''
        : 'No teacher selected';
    }
  });
});
