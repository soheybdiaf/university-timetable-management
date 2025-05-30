document.addEventListener('DOMContentLoaded', async function () {
  const formGetRooms = document.getElementById('scheduleForm'),
    Semester = document.getElementById('semester'),
    roomBloc = document.getElementById('RoomBloc'),
    RoomType = document.getElementById('RoomType'),
    RoomList = document.querySelector('.Rooms-list'),
    btnDisplayTimetable = document.querySelector('.btn-room-timetable'),
    scheduleModal = document.getElementById('scheduleModal'),
    timetableScheduler = document.querySelector('.timetable tbody'),
    closeModalBtnHeader = document.querySelector('.close-modal'),
    closeModalBtnFooter = document.querySelector('.btn-close-modal'),
    printScheduleBtn = document.querySelector('.btn-print-schedule'),
    baseURl = `http://localhost:4259/Timetable`;

  function openModal() {
    scheduleModal.style.display = 'block';
  }

  function closeModal() {
    scheduleModal.style.display = 'none';
  }

  function printSchedule() {
    window.print();
  }

  function CreateRoomList(rooms) {
    RoomList.innerHTML = rooms
      .map(
        (room, i) =>
          `<input type="radio" name="salle_id" data-name="${room.nom_salle}" value="${room.id_salle}" id="${i}">
     <label for="${i}">${room.nom_salle}</label>`,
      )
      .join('');
  }

  const CreateCellContent = ({
    id_seance,
    nom_module,
    nom_complet,
    nom_groupe,
    nom_niveau,
  }) =>
    `<div class="cell-content" data-id-slot="${id_seance}">
    <div class="module-info">
      <span class="module-name" style="font-size: 0.9rem; color: #7209b7;">${nom_module}</span>
    </div>
    <div class="schedule-details">
      <span class="teacher-name"><i class="fas fa-chalkboard-teacher"></i>${nom_complet}</span>
      <span class="groupe"><i class="fas fa-users"></i>${nom_groupe || nom_niveau}</span>
    </div>
    <button class="remove-schedule" title="Remove schedule"><i class="fas fa-times"></i></button>
   </div>`;

  function CreateRoomTimeTable(data) {
    const roomName = RoomList.querySelector('[type="radio"]:checked').dataset.name;
    document.getElementById('scheduleSemester').textContent =
      `semester ${Semester.value}`;
    document.getElementById('roomName').textContent = roomName;
    document.getElementById('Type').textContent = RoomType.selectedOptions[0].text;
    document.getElementById('Bloc').textContent = roomBloc.value;
    const timeSlot = [
      '08:00 - 09:30',
      '09:45 - 11:15',
      '11:30 - 13:00',
      '14:00 - 15:10',
      '15:45 - 17:15',
    ];

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

  async function GetRooms(event) {
    event.preventDefault();
    const RoomInfo = { bloc: roomBloc.value, type: RoomType.value };
    const responce = await fetch(
      `${baseURl}/get_rooms_by_type?bloc=${RoomInfo.bloc}&type=${RoomInfo.type}`,
    ).then((res) => res.json());
    if (responce.length) {
      CreateRoomList(responce);
    } else RoomList.innerHTML = `<h1>${responce.message}</h1>`;
  }

  async function displayRoomTimetable() {
    const RoomChecked = RoomList.querySelector('[type="radio"]:checked');
    if (!RoomChecked) return;
    const semester = Semester.value;
    const RoomId = RoomChecked.value;
    const Rows = await fetch(
      `${baseURl}/get_room_scheduler?Semester=${semester}&RoomId=${RoomId}`,
    ).then((res) => res.json());
    if (!Rows.length) return;
    CreateRoomTimeTable(Rows);
    openModal();
  }

  async function RemoveScheduleSlot(e) {
    const scheduleCell = e.currentTarget.closest('.schedule-cell');
    if (confirm('Are you sure you want to remove this time from the schedule?')) {
      const idSlot = scheduleCell.firstChild.dataset.idSlot;
      const responce = await fetch(`${baseURl}/delete_slot/${idSlot}`, {
        method: 'DELETE',
      });
      const message = await responce.json();
      message?.isSuccess ? scheduleCell.firstChild.remove() : 0;
    }
  }

  btnDisplayTimetable.addEventListener('click', displayRoomTimetable);
  printScheduleBtn.addEventListener('click', printSchedule);
  closeModalBtnHeader.addEventListener('click', closeModal);
  closeModalBtnFooter.addEventListener('click', closeModal);
  formGetRooms.addEventListener('submit', GetRooms);
});
