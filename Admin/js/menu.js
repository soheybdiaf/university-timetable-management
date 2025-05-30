document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('sidebar.html');
  const sidebarHTML = await response.text();
  document.querySelector('.menu').innerHTML = sidebarHTML;

  const SidebarEvents = () => {
    const menu = document.querySelector('.menu');
    const menuToggler = document.querySelector('.menu-toggler');
    const submenuToggles = document.querySelectorAll('.submenu-drop');

    submenuToggles.forEach((toggle) => {
      toggle.addEventListener('click', (event) => {
        event.preventDefault();
        const parentMenu = toggle.closest('.toggle-box');
        const submenu = parentMenu.querySelector('.submenu');
        parentMenu.classList.toggle('drop');
        submenu.style.height = parentMenu.classList.contains('drop')
          ? `${submenu.scrollHeight}px`
          : '0';
      });
    });

    const adjustMenuOnResize = () =>
      menu.classList.toggle('minimized', window.innerWidth <= 740);
    menuToggler.addEventListener('click', () => menu.classList.toggle('minimized'));
    window.addEventListener('resize', adjustMenuOnResize);
    adjustMenuOnResize();
  };

  SidebarEvents();

  async function SignOut() {
    if (confirm('Do you really want to log out')) {
      const response = await fetch(`http://localhost:4259/Auth/signout`);
      const logOut = await response.json();
      if (logOut.success) {
        alert("You're successfully logged out of the account");
        location.href = logOut.redirect;
      }
    }
  }

  document.getElementById('sign_out').addEventListener('click', SignOut);
});
