document.addEventListener('DOMContentLoaded', async () => {
  const $ = (selector) => document.querySelector(selector);

  const elements = {
    BoxAddScheduler: $('.box_submit'),
    box_checkAvailable: $('.box_checkAvailable'),
    formNewScheduler: $('#form_shceduler'),
    formsContainer: $('#form_container'),
    formTimes: $('#times'),
    SubjectType: $('#subject_type'),
    Level: $('#Level'),
    Groupe: $('#groupe'),
    ResetForm: $('#clearBtn'),
    isOnline: $('#online_courses'),
    checkBtnAvailable: $('#isAvailable'),
    roomsAvailable: $('#rooms'),
    days: $('.days'),
    times: $('.periods'),
    BtncheckRooms: $('.BtncheckRooms'),
    submitAvailable: $('#submitRoom'),
    submitShceduler: $('#submit_shceduler'),
    teacherName: $('#teacherName'),
    teacherId: $('#teacherId'),
    SubjectId: $('#sebjectId'),
    SubjectName: $('#sebjectName'),
    Status: $('#Status'),
    BtnAvailabletimes: $('#displayAvailable'),
    tbody: $('#scheduleTable'),
    CountRoomsAvailable: $('#CountRooms'),
    Semestre: $('#Semestre'),
  };

  const baseURL = 'http://localhost:4259/Shceduler',
    Fetch = async (url, options = {}) =>
      await fetch(url, options).then((response) => response.json());

  const toggleBox = (box, show) => {
    box.classList.toggle('show', show);
    if (show) return;
    if (box.querySelector('#modal-av')) {
      [elements.Status, elements.roomsAvailable].forEach((el) => (el.textContent = ''));
      [elements.checkBtnAvailable, elements.BtncheckRooms].forEach((btn) =>
        btn.classList.toggle('show', false),
      );
      elements.formTimes
        .querySelectorAll('input:checked')
        .forEach((input) => (input.checked = false));
      const checkElement = elements.formsContainer.querySelector('[data-check]');
      if (checkElement) delete checkElement.dataset.check;
    }
  };

  const createForm = ({ enseignant_id, nom_complet, module_id, nom_module }) =>
    `<form>
    <button type="button" data-id="delete">⛔</button>
    <select name="enseignant_id">${
      Array.isArray(enseignant_id)
        ? enseignant_id
            .map((id, i) => `<option value="${id}">${nom_complet[i]}</option>`)
            .join('')
        : `<option value="${enseignant_id}">${nom_complet}</option>`
    }</select>
    <select name="module_id"><option value="${module_id}">${nom_module}</option></select>
    <button type="button" class="checkRoom">Check Room</button>
  </form>`;

  const createRoomInputs = (day, time, room, isonline) => {
    const container = document.createElement('div');
    container.classList.add('input_container');
    container.innerHTML = `
        <span class="icon" data-name="${room?.dataset?.roomName ?? room.name}">🏨</span>
        <input type="text" name="salle_id" value="${room?.value ?? null}">
        <span class="icon" data-name="${day.dataset.dayName}">📅</span>
        <input type="text" name="jour_id" value="${day.value}">
        <span class="icon" data-name="${time.dataset.timeZone}">⏱️</span>
        <input type="text" name="horaire_id" value="${time.value}">
        <span class="icon" data-name="${isonline ? 'online' : 'offline'}">💻</span>
        <input type="text" name="mode" value="${isonline ? 'online' : 'offline'}">
    `;
    return container;
  };

  const toggleCheckBtn = () => {
    const isChecked =
      elements.formTimes.querySelectorAll("input[type='radio']:checked").length === 2;
    elements.checkBtnAvailable.classList.toggle('show', isChecked);
  };

  const boxSubmitHundlerState = (data) => {
    if (data.length) {
      const hasForm = !!elements.formsContainer.querySelector('form');
      elements.formsContainer.querySelector('.alert-box').classList.toggle('show', false);
      elements.formsContainer
        .querySelector('.success-message')
        .classList.toggle('show', !hasForm);
    } else {
      elements.formsContainer
        .querySelector('.alert-box')
        .classList.toggle('show', data.message);
      elements.formsContainer
        .querySelector('.success-message')
        .classList.toggle('show', false);
    }
  };

  const updateGroups = async () => {
    elements.Groupe.innerHTML =
      elements.SubjectType.value === 'courses' || !elements.Level.value
        ? ''
        : (
            await Fetch(
              `http://localhost:4259/inscription/get-groupes/${elements.Level.value}`,
            )
          )
            .map(
              (group) =>
                `<option value="${group.id_groupe}">${group.nom_groupe}</option>`,
            )
            .join('');
  };

  const toggleOnlineBtn = () => {
    const Checked = elements.isOnline.checked;
    elements.BtncheckRooms.classList.toggle('show', !Checked);
    elements.roomsAvailable.textContent = '';
  };

  const checkAvailability = async () => {
    const checked = [...elements.formTimes.querySelectorAll('[type="radio"]:checked')];
    if (checked.length !== 2) return;
    const data = {
      semester: elements.Semestre.value,
      enseignant_id: elements.teacherId.textContent,
      jour_id: elements.days.querySelector('[type="radio"]:checked').value,
      horaire_id: elements.times.querySelector('[type="radio"]:checked').value,
      niveau_id: elements.Level.value,
      groupe_id: elements.Groupe.value || null,
    };
    const res = await Fetch(`${baseURL}/check_shceduler?obj=${JSON.stringify(data)}`);
    elements.Status.textContent = res.message;
    elements.roomsAvailable.textContent = '';
    elements.BtncheckRooms.classList.toggle('show', res.message === 'Available');
    elements.isOnline.parentNode.classList.toggle('show', res.message == 'Available');
  };

  const createAvailableRoomInputs = () => {
    const room = elements.roomsAvailable.querySelector('input:checked'),
      day = elements.days.querySelector('input:checked'),
      time = elements.times.querySelector('input:checked');
    if ((!room && !elements.isOnline.checked) || !day || !time) return;
    const checkRoomBtn = elements.formsContainer.querySelector(`[data-check]`);
    checkRoomBtn.closest('form').querySelector('.input_container')?.remove();
    checkRoomBtn.insertAdjacentElement(
      'afterend',
      createRoomInputs(day, time, room ?? { name: 'no room' }, elements.isOnline.checked),
    );
    delete checkRoomBtn.dataset.check;
    toggleBox(elements.box_checkAvailable, false);
  };

  const Availabletimes = async () => {
    try {
      const t_id = elements.teacherId.textContent,
        l_id = elements.Level.value,
        g_id = elements.Groupe.value,
        s_id = elements.Semestre.value;
      const response = await fetch(
        `${baseURL}/get_available_time?semestre=${s_id}&nseignant_id=${t_id}&groupe_id=${g_id || null}&niveau_id=${l_id}`,
      );
      if (!response.ok) throw new Error('not time available');
      const timesAvailable = await response.text();
      const table = elements.box_checkAvailable.querySelector('#scheduleTable');
      table.textContent = ``;
      table.innerHTML = timesAvailable;
      elements.CountRoomsAvailable.textContent = NaN;
      elements.CountRoomsAvailable.style.color = '#000';
      toggleBox(table.closest('article'), true);
    } catch (error) {
      alert(error.message);
    }
  };

  const getShcedulerExist = async (e) => {
    e.preventDefault();
    toggleBox(elements.BoxAddScheduler, true);
    elements.formsContainer.querySelectorAll('form')?.forEach((f) => f.remove());
    const formObject = Object.fromEntries(new FormData(elements.formNewScheduler));
    const subjects = await Fetch(
      `${baseURL}/get_subject_shceduler?obj=${JSON.stringify(formObject)}`,
    );
    if (subjects.length) {
      elements.formsContainer.innerHTML += subjects
        .flatMap((s) =>
          s.se_restantes ? [...Array(s.se_restantes)].map(() => createForm(s)) : [],
        )
        .join('');
    }
    boxSubmitHundlerState(subjects);
  };

  const submitSchedule = async () => {
    const allForms = [...elements.formsContainer.querySelectorAll('form')];
    if (!allForms.length) return alert('no time existe');
    const formsReserved = allForms.filter(
      (form) => form.querySelectorAll('input').length,
    );
    const Duplicates =
      new Set(formsReserved.map((f) => `${f.jour_id.value}_${f.horaire_id.value}`))
        .size !== formsReserved.length;
    if (Duplicates || allForms.length !== formsReserved.length)
      return alert('Duplicates or not fully reserved');
    const formNewData = Object.fromEntries(
      new FormData(elements.formNewScheduler).entries(),
    );
    formNewData.groupe_id ??= null;
    const Schedule = formsReserved.map((form) => [
      ...Object.values(formNewData),
      ...Object.values(Object.fromEntries(new FormData(form))).map((el) =>
        el === 'null' ? null : el,
      ),
    ]);
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Schedule),
    };
    if (
      confirm(
        `Are you sure you want to add ${Schedule.length} Schedule to the database ?`,
      )
    ) {
      const responce = await Fetch(`${baseURL}/submit_shceduler`, options);
      responce?.isSuccess ? allForms.forEach((f) => f.remove()) : 0;
      getShcedulerExist(new Event('submit'));
      alert(responce.message);
    }
  };

  const checkRooms = async () => {
    const day = elements.days.querySelector('input:checked').value,
      time = elements.times.querySelector('input:checked').value;
    if (!day || !time) return;
    const res = await Fetch(`${baseURL}/check_available_rooms?obj=
      ${JSON.stringify({
        semester: elements.Semestre.value,
        day: day,
        time: time,
        type: elements.SubjectType.value,
      })}`);
    elements.roomsAvailable.innerHTML =
      res.message === 'Available'
        ? res.data
            .map(
              (r) =>
                `<input type="radio" name="salle_id" data-room-name="${r.nom_salle}" value="${r.id_salle}" id="room_${r.id_salle}">
    <label for="room_${r.id_salle}">${r.nom_salle}</label>`,
            )
            .join('')
        : 'no room available';
  };

  const virifyschedulerLimit = (isPassing) =>
    document.getElementById('schedulerReserved').classList.toggle('limit', isPassing);

  const getBookingInfo = ({
    enseignant_id,
    nom_complet,
    horaires_preferes,
    jours_preferes,
    module_preferes,
    departement,
    schedulerReserved,
    id_module,
    nom_module,
    nom_specialite,
    semester_module,
    weeklyhorairesNumber,
  }) => {
    elements.teacherId.textContent = enseignant_id;
    elements.teacherName.textContent = nom_complet;
    document.getElementById('Departement').textContent = departement;
    document.getElementById('preferenceModule').textContent =
      module_preferes || 'not Submited';
    document.getElementById('preferenceDay').textContent =
      jours_preferes || 'not Submited';
    document.getElementById('preferenceTimes').textContent =
      horaires_preferes || 'not Submited';
    document.getElementById('schedulerReserved').textContent = schedulerReserved;
    elements.SubjectId.textContent = id_module;
    elements.SubjectName.textContent = nom_module;
    document.getElementById('seanceType').textContent =
      elements.SubjectType.selectedOptions[0].textContent;
    document.getElementById('Speciality').textContent = nom_specialite;
    document.getElementById('semesterModule').textContent = semester_module;
    document.getElementById('weeklyhoraires').textContent = weeklyhorairesNumber;
    virifyschedulerLimit(schedulerReserved > 16);
  };

  elements.formNewScheduler.addEventListener('submit', getShcedulerExist);

  elements.formsContainer.addEventListener('click', async (e) => {
    if (e.target.classList.contains('checkRoom')) {
      const form = e.target.closest('form');
      const teacherId = form.querySelector('select[name="enseignant_id"]').value,
        subjectId = form.querySelector('select[name="module_id"]').value;
      const info = await Fetch(
        `${baseURL}/teacher_subject_info/${teacherId}/${subjectId}`,
      );
      if (info) getBookingInfo(info);
      toggleBox(elements.box_checkAvailable, true);
      e.target.dataset.check = ``;
    } else if (e.target.dataset.id === 'delete') e.target.closest('form')?.remove();
  });
  elements.tbody.addEventListener('click', async (e) => {
    const button = e.target;
    if (!button.classList.contains('isRooms')) return;
    const res = await Fetch(`${baseURL}/check_available_rooms?obj=
    ${JSON.stringify({
      semester: elements.Semestre.value,
      day: button.dataset.day,
      time: button.dataset.time,
      type: elements.SubjectType.value,
    })}`);
    const roomCounter = res?.data?.length ?? 0;
    elements.CountRoomsAvailable.textContent = roomCounter;
    elements.CountRoomsAvailable.style.color = roomCounter ? 'green' : 'red';
  });
  elements.submitAvailable.addEventListener('click', createAvailableRoomInputs);
  elements.checkBtnAvailable.addEventListener('click', checkAvailability);
  elements.submitShceduler.addEventListener('click', submitSchedule);
  elements.formTimes.addEventListener('click', toggleCheckBtn);
  elements.isOnline.addEventListener('click', toggleOnlineBtn);
  elements.ResetForm.addEventListener('click', () => elements.formNewScheduler.reset());
  elements.SubjectType.addEventListener('change', updateGroups);
  elements.Level.addEventListener('change', updateGroups);
  elements.BtncheckRooms.addEventListener('click', checkRooms);
  elements.BtnAvailabletimes.addEventListener('click', Availabletimes);
  document
    .querySelectorAll('.closeBtn')
    .forEach((btn) =>
      btn.addEventListener('click', () => toggleBox(btn.closest('article'), false)),
    );
});
