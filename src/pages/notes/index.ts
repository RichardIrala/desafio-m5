export function notesPage() {
  const root = document.querySelector(".root");
  root.innerHTML = `
  <notes-header-el>Mis pendientes</notes-header-el>
  <pendiente-el></pendiente-el>
  <hoja-pendiente-el></hoja-pendiente-el>
  <homepage-icon></homepage-icon>
  `;
  const iconHomePage = root.querySelector("homepage-icon");
  const shadowIconHomePage = iconHomePage["shadow"];
  const style = document.createElement("style");
  style.innerHTML = `
    .homepage-icon {
      top: calc(98vh - 80px);
    }
  `;
  shadowIconHomePage.appendChild(style);
  console.log(shadowIconHomePage);
}
