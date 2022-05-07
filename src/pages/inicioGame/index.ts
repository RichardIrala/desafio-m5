const fondoDelJuego = require("url:../../components/imgs/fondo.svg");
export function pageInicioGame(params: any) {
  const root = document.querySelector(".root");
  const div = document.createElement("div");
  div.classList.add("principal-container");
  const style = document.createElement("style");
  root.innerHTML = ``;
  div.innerHTML = ` 
  <game-title></game-title>
  <game-button-blue>Empezar</game-button-blue>
  <ppot-el></ppot-el>
  <homepage-icon></homepage-icon>
  `;
  style.innerHTML = `
  .principal-container {
    background: url(${fondoDelJuego});
    background-size: cover;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 74px;
    padding-top: 115px;
  }
  `;
  function eventos() {
    div.querySelector("game-button-blue").addEventListener("click", () => {
      params("/game-instructions");
    });
  }
  root.appendChild(div);
  root.appendChild(style);

  eventos();
}

//Inicio el juego de piedra papel o tijeras
