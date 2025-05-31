document.addEventListener('DOMContentLoaded', async function () {
  const Fetch_Data = async (endpoints, options = {}) =>
      fetch(endpoints, options).then((res) => res.json()),
    BaseUrl = `http://localhost:4259/Timetable`;

  const recentTimetables = JSON.parse(localStorage.getItem('recentTimetable')) || [],
    timetableScheduler = document.querySelector('.timetable tbody'),
    schedulesList = document.querySelector('.schedules-list'),
    timeSlot = [
      '08:00 - 09:30',
      '09:45 - 11:15',
      '11:30 - 13:00',
      '14:00 - 15:10',
      '15:45 - 17:15',
    ],
    Days = ['Sat', 'Sun', 'Mon', 'Tue', 'Web', 'Thu'];

  const scheduleForm = document.getElementById('scheduleForm'),
    semesterSelect = document.getElementById('semester'),
    levelSelect = document.getElementById('level'),
    groupSelect = document.getElementById('group');

  const scheduleModal = document.getElementById('scheduleModal'),
    scheduleLevelElement = document.getElementById('scheduleLevel'),
    scheduleGroupElement = document.getElementById('scheduleGroup'),
    scheduleSemesterElement = document.getElementById('scheduleSemester'),
    closeModalBtnHeader = document.querySelector('.close-modal'),
    printScheduleBtn = document.querySelector('.btn-print-schedule'),
    closeModalBtnFooter = document.querySelector('.btn-close-modal');

  if (scheduleForm) scheduleForm.addEventListener('submit', FormSubmit);

  if (closeModalBtnHeader) closeModalBtnHeader.addEventListener('click', closeModal);

  if (closeModalBtnFooter) closeModalBtnFooter.addEventListener('click', closeModal);

  if (printScheduleBtn) printScheduleBtn.addEventListener('click', printSchedule);

  const CreateCellContent = ({
    id_seance,
    type_seance,
    nom_module,
    nom_complet,
    nom_salle,
  }) =>
    `<div class="cell-content" data-id-slot="${id_seance}">
    <div class="module-info">
      <span class="module-type">${type_seance}</span>
      <span class="module-name">${nom_module}</span>
    </div>
    <div class="schedule-details">
      <span class="teacher-name"><i class="fas fa-chalkboard-teacher"></i>${nom_complet}</span>
      <span class="classroom"><i class="fas fa-door-open"></i>${nom_salle || 'Online'}</span>
    </div>
    <button class="remove-schedule" title="Remove schedule"><i class="fas fa-times"></i></button>
   </div>`;

  const CreateTimeTable = (data) => {
    const rows = timeSlot.map((time, i) => {
      const Row = document.createElement('tr');
      Row.innerHTML = `<td class="time-slot">${time}</td>`;

      Days.forEach((day, j) => {
        const timeSlotId = `${j + 1}-${i + 1}`;
        const TimeExist = data.find(
          (el) => `${el.jour_id}-${el.horaire_id}` === timeSlotId,
        );
        const CellScheduler = document.createElement('td');
        CellScheduler.className = 'schedule-cell';
        CellScheduler.dataset.timeSlot = timeSlotId;
        if (TimeExist) CellScheduler.innerHTML = CreateCellContent(TimeExist);
        Row.appendChild(CellScheduler);
        const CourseSlot =
          CellScheduler.querySelector('.module-type')?.textContent == 'courses';
        const PrtSlot =
          CellScheduler.querySelector('.module-type')?.textContent == 'pratical_work';
        if (CourseSlot) CellScheduler.classList.add('courses');
        else if (PrtSlot) CellScheduler.classList.add('prt');
      });

      return Row;
    });

    timetableScheduler.textContent = '';
    timetableScheduler.append(...rows);
    timetableScheduler
      .querySelectorAll('.remove-schedule')
      .forEach((button) => button.addEventListener('click', RemoveScheduleSlot));
  };

  async function FormSubmit(e) {
    e.preventDefault();
    const semester = semesterSelect.value;
    const level = levelSelect.selectedOptions[0].text;
    const group = groupSelect.selectedOptions[0].text.substring(1, 3);
    scheduleLevelElement.textContent = level;
    scheduleGroupElement.textContent = `Group ${group}`;
    scheduleSemesterElement.textContent = `Semester ${semester}`;
    const QeuryParams = `Semester=${semester}&Level=${levelSelect.value}&Groupe=${groupSelect.value}`;
    const Rows = await Fetch_Data(`${BaseUrl}/get_groupe_scheduler?${QeuryParams}`);
    if (!Rows.length) {
      alert(Rows.message);
      return;
    };
    CreateTimeTable(Rows);
    openModal();
    addToLocalStorage(Rows, semester, level, group, new Date());
    addToRecentSchedules();
  }

  function openModal() {
    scheduleModal.style.display = 'block';
  }

  function closeModal() {
    scheduleModal.style.display = 'none';
  }

  function printSchedule() {
    window.print();
  }

  function addToLocalStorage(rows, semester, level, group, date) {
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    const timetable = {
      Date: formattedDate,
      Level: level,
      Semester: semester,
      Groupe: group,
      Data: rows,
    };
    recentTimetables.push(timetable);
    localStorage.setItem('recentTimetable', JSON.stringify(recentTimetables));
  }

  function addToRecentSchedules() {
    if (recentTimetables.length) {
      schedulesList.textContent = ``;
      recentTimetables.forEach((table, i) => {
        const newScheduleItem = document.createElement('li');
        newScheduleItem.className = 'schedule-item';
        newScheduleItem.dataset.index = `${i}`;
        newScheduleItem.innerHTML = `<div class="schedule-info">
      <span class="schedule-title">${table.Level} - Group ${table.Groupe} - semester ${table.Semester}</span>
      <span class="schedule-date">${table.Date}</span></div>
      <div class="schedule-actions">
      <button class="btn-icon btn-view" title="View schedule">
      <i class="fas fa-eye"></i></button>
      <button class="btn-icon btn-print" title="Print schedule">
      <i class="fas fa-print"></i></button>
      <button class="btn-icon btn-delete" title="Delete schedule">
      <i class="fas fa-trash-alt"></i></button></div>`;
        schedulesList?.insertBefore(newScheduleItem, schedulesList.firstChild);
      });
    } else schedulesList.innerHTML = `<h1>No Recent schedule</h1>`;
  }

  function ViewScheduler(btn, data) {
    const scheduleItem = btn.closest('.schedule-item');
    const titleText = scheduleItem.querySelector('.schedule-title').textContent;
    const parts = titleText.split('-');
    const level = parts[0];
    const group = parts[1];
    const semester = parts[2];
    scheduleLevelElement.textContent = level;
    scheduleGroupElement.textContent = group;
    scheduleSemesterElement.textContent = semester;
    CreateTimeTable(data);
    openModal();
  }

  function DeleteSchedule(index) {
    if (confirm('Are you sure you want to delete this schedule?')) {
      recentTimetables.splice(index, 1);
      localStorage.setItem('recentTimetable', JSON.stringify(recentTimetables));
      addToRecentSchedules();
    }
  }

  async function RemoveScheduleSlot(e) {
    const scheduleCell = e.currentTarget.closest('.schedule-cell');
    if (confirm('Are you sure you want to remove this time from the schedule?')) {
      const idSlot = scheduleCell.firstChild.dataset.idSlot;
      const responce = await Fetch_Data(`${BaseUrl}/delete_slot/${idSlot}`, {
        method: 'DELETE',
      });
      responce?.isSuccess ? scheduleCell.firstChild.remove() : 0;
    }
  }

  function ActionsRecentSchedules(e) {
    const button = e.target;
    if (!button.closest('.schedule-actions')) return;
    const Idx = button.closest('.schedule-item').dataset.index;
    const data = recentTimetables[Idx].Data;
    const ViewBtn =
      button.classList.contains('btn-view') || button.classList.contains('fa-eye');
    const DeleteBtn =
      button.classList.contains('btn-delete') ||
      button.classList.contains('fa-trash-alt');
    const PrintBtn =
      button.classList.contains('btn-print') || button.classList.contains('fa-print');
    if (ViewBtn) {
      ViewScheduler(button, data);
    } else if (DeleteBtn) {
      DeleteSchedule(Idx);
    } else if (PrintBtn) {
      CreateTimeTable(data);
      openModal();
      printSchedule();
    } else return;
  }

  levelSelect.addEventListener('change', async () => {
    const levelId = levelSelect.value;
    const groups = await Fetch_Data(
      `http://localhost:4259/inscription/get-groupes/${levelId}`,
    );
    groupSelect.innerHTML = `<option value="" disabled selected>Select group</option>`;
    groupSelect.innerHTML += groups
      .map((group) => `<option value="${group.id_groupe}">${group.nom_groupe}</option>`)
      .join('');
  });

  schedulesList.addEventListener('click', (e) => ActionsRecentSchedules(e));

  addToRecentSchedules();
});
