document.addEventListener('DOMContentLoaded', async function () {
  const context = document.getElementById('ChartGroupes').getContext('2d');
  let chartJs;

  function updateChart(data) {
    const labels = data.map(({ nom_groupe }) => nom_groupe);
    const totalSessions = data.map(({ nb_seance }) => nb_seance || 0);
    const remainingSessions = data.map(({ nb_restantes }) => nb_restantes || 0);
    const completedSessions = data.map(
      (item, index) => totalSessions[index] - remainingSessions[index],
    );

    if (chartJs) chartJs.destroy();

    chartJs = new Chart(context, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Completed Sessions',
            data: completedSessions,
            backgroundColor: ' #2dc653',
            borderColor: 'rgba(52, 187, 86, 0.77)',
            borderWidth: 1,
          },
          {
            label: 'Remaining Sessions',
            data: remainingSessions,
            backgroundColor: ' #f72585',
            borderColor: ' #f72599',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            display: true,
            text: `Sessions Distribution - Level ${getCurrentLevel()} - Semester ${getCurrentSemester()}`,
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            stacked: true,
            title: {
              display: true,
              text: 'Groups',
            },
          },
          y: {
            stacked: true,
            title: {
              display: true,
              text: 'Number of Sessions',
            },
          },
        },
      },
    });
  }

  async function loadSessionsData(level = 1, semester = 1) {
    try {
      const response = await fetch(
        `http://localhost:4259/Dashboard/seances_restantes/${level}/${semester}`,
      );

      if (!response.ok) throw new Error(`${response.status}`);

      const result = await response.json();

      if (result.success && result.data.length > 0) updateChart(result.data);
    } catch (error) {
      console.error('Connection error:', error);
    }
  }

  const getCurrentLevel = () => document.getElementById('levelSelect').value;

  const getCurrentSemester = () => document.getElementById('semesterSelect').value;

  document.getElementById('levelSelect').addEventListener('change', (e) => {
    const semester = getCurrentSemester();
    loadSessionsData(e.target.value, semester);
  });

  document.getElementById('semesterSelect').addEventListener('change', (e) => {
    const level = getCurrentLevel();
    loadSessionsData(level, e.target.value);
  });

  await loadSessionsData(1, 1);
});
