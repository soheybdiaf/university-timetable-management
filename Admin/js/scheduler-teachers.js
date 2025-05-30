document.addEventListener('DOMContentLoaded', async function () {
  const teacherScheduleForm = document.getElementById('teacherScheduleForm'),
    SemesterSelect = document.getElementById('semester'),
    TeacherSelect = document.getElementById('teacher'),
    ModuleSelect = document.getElementById('module'),
    LevelSelect = document.getElementById('level'),
    TeacherContainer = document.querySelector('.teacher-info-card'),
    EmptyContainer = document.querySelector('.teacher-info-empty'),
    BtnCloseInfo = document.querySelector('.close-teacher-info'),
    UrlSubjectByLevel = `http://localhost:4259/Teachers_Subjects`,
    UrlTimetable = `http://localhost:4259/Timetable`;

  const scheduleModal = document.getElementById('scheduleModal'),
    timetableScheduler = document.querySelector('.timetable tbody'),
    scheduleSemesterElement = document.getElementById('scheduleSemester'),
    teacherFullNameElement = document.getElementById('teacherFullName'),
    teacherDepartmentElement = document.getElementById('teacherDepartment'),
    closeModalBtnHeader = document.querySelector('.close-modal'),
    printScheduleBtn = document.querySelector('.btn-print-schedule'),
    closeModalBtnFooter = document.querySelector('.btn-close-modal');

  const $ = (selector) => document.querySelector(selector);

  const teacherInfo = {
    teacherName: $('#teacherName'),
    teacherDprt: $('#teacherDepartement'),
    teachingHours: $('#teachingHours'),
    moduleCount: $('#moduleCount'),
    groupCount: $('#groupCount'),
    teachingModules: $('#teachingModules'),
    btnTeacherTimetable: $('.btn-teacher-timetable'),
  };

  const {
    teacherName,
    teacherDprt,
    teachingModules,
    teachingHours,
    moduleCount,
    groupCount,
    btnTeacherTimetable,
  } = teacherInfo;

  function openModal() {
    scheduleModal.style.display = 'block';
  }

  function closeModal() {
    scheduleModal.style.display = 'none';
  }

  function printSchedule() {
    window.print();
  }

  const CreateCellContent = ({
    id_seance,
    nom_module,
    nom_salle,
    nom_groupe,
    nom_niveau,
  }) =>
    `<div class="cell-content" data-id-slot="${id_seance}">
          <div class="module-info">
            <span class="module-name" style="font-size: 0.9rem; color: green;">${nom_module}</span>
          </div>
          <div class="schedule-details">
            <span class="classroom"><i class="fas fa-door-open"></i>${nom_salle || 'Online'}</span>
            <span class="groupe"><i class="fas fa-users"></i>${nom_groupe || nom_niveau}</span>
          </div>
          <button class="remove-schedule" title="Remove schedule"><i class="fas fa-times"></i></button>
         </div>`;

  function CreateRoomTimeTable(data) {
    const timeSlot = [
      '08:00 - 09:30',
      '09:45 - 11:15',
      '11:30 - 13:00',
      '14:00 - 15:10',
      '15:45 - 17:15',
    ];
    scheduleSemesterElement.textContent = `Semestre ${SemesterSelect.value}`;
    teacherFullNameElement.textContent = TeacherSelect.selectedOptions[0].text;
    teacherDepartmentElement.textContent = teacherDprt.textContent.split(' - ')[1];

    const rows = timeSlot.map((time, i) => {
      const Row = document.createElement('tr');
      Row.innerHTML = `<td class="time-slot">${time}</td>`;
      [...Array(6)].forEach((day, j) => {
        const CellScheduler = document.createElement('td'),
          timeSlotId = `${j + 1}-${i + 1}`,
          TimeExist = data.find((el) => `${el.jour_id}-${el.horaire_id}` === timeSlotId);
        CellScheduler.className = 'schedule-cell';
        CellScheduler.dataset.timeSlot = timeSlotId;
        if (TimeExist) CellScheduler.innerHTML = CreateCellContent(TimeExist);
        Row.appendChild(CellScheduler);
      });
      return Row;
    });
    timetableScheduler.textContent = '';
    timetableScheduler.append(...rows);
    timetableScheduler
      .querySelectorAll('.remove-schedule')
      .forEach((button) => button.addEventListener('click', RemoveScheduleSlot));
  }

  function DisplayTeacherInfo(show) {
    EmptyContainer.classList.toggle('hidden', show);
    TeacherContainer.classList.toggle('hidden', !show);
  }

  function insertTeachingModules(modules) {
    teachingModules.innerHTML = modules.length
      ? modules
          .map(
            ({ nom_module }) =>
              `<li><span class="module-type">${nom_module.substring(0, 4)}</span>${nom_module}</li>`,
          )
          .join('')
      : modules;
  }

  function insertTeacherStats(data) {
    teacherName.textContent = data.Basic_Info.nom_complet;
    teacherDprt.textContent = `Departement - ${data.Basic_Info.departement}`;
    teachingHours.textContent = data.teaching_Hours;
    moduleCount.textContent = data.module_Count;
    groupCount.textContent = data.group_Count;
    insertTeachingModules(data.Modules);
  }

  async function getSubject() {
    const response = await fetch(
      `${UrlSubjectByLevel}/get_subject_by_level?semestre=${SemesterSelect.value}&level=${LevelSelect.value}`,
    );
    const Subjects = await response.json();
    ModuleSelect.querySelectorAll('option:not([disabled])').forEach((option) =>
      option.remove(),
    );
    if (!Array.isArray(Subjects)) return;
    ModuleSelect.innerHTML += Subjects?.map(
      ({ id_module, nom_module }) =>
        `<option value="${id_module}">${nom_module}</option>`,
    ).join('');
  }

  async function getTeachersList() {
    const response = await fetch(
      `${UrlSubjectByLevel}/get_teachers_by_subjects?subjectId=${ModuleSelect.value}`,
    );
    const Teachers = await response.json();
    TeacherSelect.querySelectorAll('option:not([disabled])').forEach((option) =>
      option.remove(),
    );
    if (!Array.isArray(Teachers)) return;
    TeacherSelect.innerHTML += Teachers?.map(
      ({ enseignant_id, nom_complet }) =>
        `<option value="${enseignant_id}">${nom_complet}</option>`,
    ).join('');
  }

  async function getTeacherInfo(event) {
    event.preventDefault();
    DisplayTeacherInfo(true);
    const teacherId = TeacherSelect.value,
      Semester = SemesterSelect.value;
    const response = await fetch(
      `${UrlTimetable}/get_teacher_statistics/${teacherId}/${Semester}`,
    );
    const TeacherStatistics = await response.json();
    insertTeacherStats(TeacherStatistics);
  }

  async function GetTeacherTimetable() {
    const teacherId = TeacherSelect.value,
      Semester = SemesterSelect.value;
    const response = await fetch(
      `${UrlTimetable}/get_teacher_scheduler/${teacherId}/${Semester}`,
    );
    const teacherTimetable = await response.json();
    if (!teacherTimetable.length) return;
    CreateRoomTimeTable(teacherTimetable);
    openModal();
  }

  async function RemoveScheduleSlot(e) {
    const scheduleCell = e.currentTarget.closest('.schedule-cell');
    if (confirm('Are you sure you want to remove this time from the schedule?')) {
      const idSlot = scheduleCell.firstChild.dataset.idSlot;
      const responce = await fetch(`${UrlTimetable}/delete_slot/${idSlot}`, {
        method: 'DELETE',
      });
      const message = await responce.json();
      message?.isSuccess ? scheduleCell.firstChild.remove() : 0;
    }
  }

  teacherScheduleForm.addEventListener('submit', getTeacherInfo);
  ModuleSelect.addEventListener('change', getTeachersList);
  SemesterSelect.addEventListener('change', getSubject);
  LevelSelect.addEventListener('change', getSubject);
  BtnCloseInfo.addEventListener('click', () => DisplayTeacherInfo(false));
  btnTeacherTimetable.addEventListener('click', GetTeacherTimetable);
  closeModalBtnHeader.addEventListener('click', closeModal);
  closeModalBtnFooter.addEventListener('click', closeModal);
  printScheduleBtn.addEventListener('click', printSchedule);
  if (SemesterSelect.value && LevelSelect.value) await getSubject();
  if (ModuleSelect.value) await getTeachersList();
});
