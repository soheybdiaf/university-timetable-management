export default class Operation {
  constructor(objectName, baseUrl, Route, endsPoints, GetData, body) {
    this.name = objectName;
    this.baseUrl = baseUrl;
    this.Route = Route;
    this.endsPoints = endsPoints;
    this.data = GetData;
    this.body = body;
    this.modal = this.body.querySelector('.modal-box');
    this.form = this.body.querySelector('.form_create');
    this.addBtn = this.body.querySelector('.add_data');
    this.closeModalBtn = this.body.querySelector('.close_modal');
    this.message = this.body.querySelector('#message');
    this.dellMessage = this.body.querySelector('#message_delete');
    this.table = this.body.querySelector('#tbody');
    this.Events();
  }

  Fetch_All = async (endPoint) =>
    fetch(`${this.baseUrl}/${this.Route}/${endPoint}`).then((res) => res.json());
  Fetch_By_Id = async (endPoint, id) =>
    fetch(`${this.baseUrl}/${this.Route}/${endPoint}/${id}`).then((res) => res.json());
  Post_Data = async (endPoint, object) =>
    fetch(`${this.baseUrl}/${this.Route}/${endPoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(object),
    });
  Update_Data = async (endPoint, object, id) =>
    fetch(`${this.baseUrl}/${this.Route}/${endPoint}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(object),
    });
  Delete_Data = async (endPoint, id) =>
    fetch(`${this.baseUrl}/${this.Route}/${endPoint}/${id}`, {
      method: 'DELETE',
    });

  show_Message_Status = async (response) => {
    const Data = await response.json();
    this.message.style.color = response.ok ? '#198754' : '#b02a37';
    this.modal.classList.contains('show')
      ? (this.message.textContent = Data.message)
      : (this.dellMessage.classList.add('show'),
        (this.dellMessage.textContent = Data.message));
    this.dellMessage.classList.contains('show')
      ? setTimeout(() => {
          this.dellMessage.classList.remove('show');
          this.dellMessage.textContent = ``;
        }, 7000)
      : 0;
  };

  toggle_Modal_State = (is_Show) => {
    this.modal.classList.toggle('show', is_Show);
    this.body
      .querySelectorAll(
        '.btn-delete, .btn-update, .btn-info, .add_data, .assign_Subjects',
      )
      .forEach((btn) => (btn.disabled = is_Show));
    if (!is_Show) this.form.dataset.update = this.message.textContent = '';
  };

  Check_Mode = (mode = false, title, txt) => {
    this.modal.querySelector('h2').textContent = title;
    if (this.form.querySelector('#email') && this.form.querySelector('#password')) {
      this.form.querySelector('#email').disabled = mode;
      this.form.querySelector('#password').disabled = mode;
    }
    this.form.querySelector('#submit').value = txt;
  };

  Action_Btn = async (event) => {
    const button = event.target.closest('.btn-update, .btn-delete');
    if (!button) return;

    const Id = button.dataset.id;
    const Tr = button.closest('tr');

    if (button.classList.contains('btn-delete')) {
      if (confirm(`Do you want to delete this ${this.name}`)) {
        const response = await this.Delete_Data(this.endsPoints.DELL, Id);
        if (response.ok) Tr.remove();
        this.show_Message_Status(response);
      }
    } else {
      this.toggle_Modal_State(true);
      this.form.dataset.update = Id;
      this.Check_Mode(true, `Update ${this.name}`, 'Update');

      const [data] = await this.Fetch_By_Id(this.endsPoints.GET, Id);
      Object.keys(data).forEach((key) => {
        const INPUT = this.form.querySelector(`[name="${key}"]`);
        if (INPUT) INPUT.value = data[key];
      });
    }
  };

  Form_Submit = async (event) => {
    event.preventDefault();
    const Formdata = new FormData(this.form);
    const formObject = Object.fromEntries(Formdata.entries());
    const Id = this.form.dataset.update;
    const response = Id
      ? await this.Update_Data(this.endsPoints.UPD, formObject, Id)
      : await this.Post_Data(this.endsPoints.ADD, formObject);
    this.show_Message_Status(response);
    if (response.ok) {
      await this.data();
      this.form.reset();
    }
  };

  Add_Btn = () => {
    this.Check_Mode(false, `Add New ${this.name}`, 'Submit');
    this.toggle_Modal_State(true);
  };

  Close_Btn = () => {
    this.form.reset();
    this.toggle_Modal_State(false);
  };

  Events = () => {
    this.table.addEventListener('click', (event) => this.Action_Btn(event));
    this.form.addEventListener('submit', (event) => this.Form_Submit(event));
    this.addBtn.addEventListener('click', () => this.Add_Btn());
    this.closeModalBtn.addEventListener('click', () => this.Close_Btn());
  };
}
