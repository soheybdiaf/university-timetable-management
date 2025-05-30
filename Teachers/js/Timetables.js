document.addEventListener('DOMContentLoaded', async function () {
  const scheduleModal = document.getElementById('scheduleModal'),
    timetableScheduler = document.querySelector('.timetable tbody'),
    scheduleSemesterElement = document.getElementById('scheduleSemester'),
    teacherFullNameElement = document.getElementById('teacherFullName'),
    teacherDepartmentElement = document.getElementById('teacherDepartment'),
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
    teacherFullNameElement.textContent =
      document.getElementById('teacherName').textContent;
    teacherDepartmentElement.textContent =
      document.getElementById('Department').textContent;

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
      });

      return Row;
    });

    timetableScheduler.textContent = '';
    timetableScheduler.append(...rows);
  }

  async function GetTeacherTimetable() {
    const teacherId = document.getElementById('UserId').textContent,
      Semester = this.dataset.semester;
    const response = await fetch(
      `${UrlTimetable}/get_teacher_scheduler/${teacherId}/${Semester}`,
    );
    const teacherTimetable = await response.json();
    if (!teacherTimetable.length) {
      document.getElementById('no_time').textContent = teacherTimetable?.message;
      setTimeout(() => (document.getElementById('no_time').textContent = ``), 5000);
      return;
    }
    CreateTimeTable(teacherTimetable, Semester);
    openModal();
  }

  [...btnsDisplayTimetable].forEach((button) =>
    button.addEventListener('click', GetTeacherTimetable),
  );
  [...closeModalBtns].forEach((closeBtn) =>
    closeBtn.addEventListener('click', closeModal),
  );
  printScheduleBtn.addEventListener('click', printSchedule);
});
