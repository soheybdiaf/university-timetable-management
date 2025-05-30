document.addEventListener('DOMContentLoaded', async function () {
  const context = document.getElementById('ChartEnseignant').getContext('2d');
  let chartJs;

  const getCurrentEnseignant = () => document.getElementById('enseignantSelect').value;

  const getCurrentSemester = () => document.getElementById('semesterSelectEns').value;

  function updateChart(data) {
    const completedSessions = data.nb_reserved;
    const remainingSessions = data.nb_restant;

    if (chartJs) chartJs.destroy();

    chartJs = new Chart(context, {
      type: 'pie',
      data: {
        labels: ['Completed Sessions', 'Remaining Sessions'],
        datasets: [
          {
            data: [completedSessions, remainingSessions],
            backgroundColor: ['#2dc653', '#f72585'],
            borderColor: ['#34bb56', '#f72599'],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            display: true,
            text: `${data.nom_complet} - Sessions Progress`,
          },
        },
      },
    });
  }

  async function loadEnseignantData(enseignantId = 34, semester = 1) {
    if (chartJs) chartJs.destroy();

    if (!enseignantId) return;

    try {
      const response = await fetch(
        `http://localhost:4259/Dashboard/enseignant-stat/${enseignantId}/${semester}`,
      );

      if (!response.ok) throw new Error(`${response.status}`);

      const result = await response.json();

      if (result.success && result.data) updateChart(result.data);
    } catch (error) {
      console.error('Connection error:', error);
    }
  }

  async function loadEnseignants() {
    try {
      const response = await fetch('/Dashboard/get_Enseignants');

      if (!response.ok) throw new Error(`${response.status}`);

      const result = await response.json();

      if (result.success && result.data.length > 0) {
        const select = document.getElementById('enseignantSelect');

        const options = document.createDocumentFragment();

        result.data.forEach((enseignant) => {
          const option = document.createElement('option');
          option.value = enseignant.id_enseignant;
          option.textContent = enseignant.nom_complet;
          options.appendChild(option);
        });

        select.appendChild(options);
      }
    } catch (error) {
      console.error('Connection error:', error);
    }
  }

  document.getElementById('enseignantSelect').addEventListener('change', (e) => {
    const semester = getCurrentSemester();
    loadEnseignantData(e.target.value, semester);
  });

  document.getElementById('semesterSelectEns').addEventListener('change', (e) => {
    const enseignant = getCurrentEnseignant();
    loadEnseignantData(enseignant, e.target.value);
  });

  await loadEnseignants();
  await loadEnseignantData();
});
