document.addEventListener('DOMContentLoaded', async function () {
  const scheduleModal = document.getElementById('scheduleModal'),
    timetableScheduler = document.querySelector('.timetable tbody'),
    scheduleSemesterElement = document.getElementById('scheduleSemester'),
    StudentFullNameElement = document.getElementById('studentFullName'),
    StudentSpeciality = document.getElementById('SpecialtyName'),
    StudentGroupe = document.getElementById('studentGroup'),
    closeModalBtns = document.querySelectorAll('.close-modal, .btn-close-modal'),
    printScheduleBtn = document.querySelector('.btn-print-schedule'),
    btnsDisplayTimetable = document.getElementsByClassName('view-btn'),
    UrlTimetable = `http://localhost:4259/Timetable`;

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
    </div>`;

  function CreateTimeTable(data, semestreNumber) {
    const timeSlot = [
      '08:00 - 09:30',
      '09:45 - 11:15',
      '11:30 - 13:00',
      '14:00 - 15:10',
      '15:45 - 17:15',
    ];
    scheduleSemesterElement.textContent = `Semestre ${semestreNumber}`;
    StudentFullNameElement.textContent =
      document.getElementById('studentName').textContent;
    document.getElementById('studentSpeciality').textContent =
      StudentSpeciality.textContent;
    StudentGroupe.textContent = document.getElementById('GroupName').textContent;

    const rows = timeSlot.map((time, i) => {
      const Row = document.createElement('tr');
      Row.innerHTML = `<td class="time-slot">${time}</td>`;
      [...Array(6)].forEach((day, j) => {
        const CellScheduler = document.createElement('td'),
          timeSlotId = `${j + 1}-${i + 1}`,
          TimeExist = data.find((el) => `${el.jour_id}-${el.horaire_id}` === timeSlotId);

        if (TimeExist) {
          CellScheduler.className = 'schedule-cell';
          CellScheduler.dataset.timeSlot = timeSlotId;
          CellScheduler.innerHTML = CreateCellContent(TimeExist);
        }

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
  }

  async function GetTGroupeTimetable() {
    const levelId = localStorage.getItem('LevelId'),
      groupeId = localStorage.getItem('GroupeId'),
      Semester = this.dataset.semester;
    const QeuryParams = `Semester=${Semester}&Level=${levelId}&Groupe=${groupeId}`;
    const response = await fetch(`${UrlTimetable}/get_groupe_scheduler?${QeuryParams}`);
    const GroupeTimetable = await response.json();
    if (!GroupeTimetable.length) {
      document.getElementById('no_time').textContent = GroupeTimetable?.message;
      setTimeout(() => (document.getElementById('no_time').textContent = ``), 5000);
      return;
    }
    CreateTimeTable(GroupeTimetable, Semester);
    openModal();
  }

  [...btnsDisplayTimetable].forEach((button) =>
    button.addEventListener('click', GetTGroupeTimetable),
  );
  [...closeModalBtns].forEach((closeBtn) =>
    closeBtn.addEventListener('click', closeModal),
  );
  printScheduleBtn.addEventListener('click', printSchedule);
});
