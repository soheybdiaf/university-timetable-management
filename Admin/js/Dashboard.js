document.addEventListener('DOMContentLoaded', async () => {
  const $ = (selector) => document.getElementById(selector);

  const elements = {
    teachersCount: $('nbrTeach'),
    studentsCount: $('nbrEtu'),
    levelsCount: $('nbrLev'),
    groupesCount: $('nbrGro'),
  };

  const { teachersCount, levelsCount, groupesCount, studentsCount } = elements;

  const baseURL = 'http://localhost:4259/Dashboard',
    Fetch = async (url, options = {}) =>
      await fetch(url, options).then((response) => response.json());

  (async function getStatistiques() {
    const [Data] = await Fetch(`${baseURL}/get_statistiques`);
    teachersCount.textContent = Data.Teachers;
    studentsCount.textContent = Data.STUDENTS;
    levelsCount.textContent = Data.LEVELS;
    groupesCount.textContent = Data.GROUPES;
  })();
});
