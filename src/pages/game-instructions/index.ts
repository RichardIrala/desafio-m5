const fondoDelJuego = require("url:../../components/imgs/fondo.svg");
export function gameIntructionsPage(params: any) {
  const root = document.querySelector(".root");
  root.innerHTML = ``;
  const div = document.createElement("div");
  div.classList.add("principal-container");
  const style = document.createElement("style");
  root.innerHTML = ``;
  div.innerHTML = ` 
  <p class="instructions">Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</p>
  <game-button-blue>¡Jugar!</game-button-blue>
  <ppot-el></ppot-el>
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
  .instructions {
      width: 317px;
      font-size: 40px;
      font-weight: 600;
      text-align: center;
  }
  `;

  root.appendChild(div);
  root.appendChild(style);
  div.querySelector("game-button-blue").addEventListener("click", () => {
    params("/play-game");
  });
}
//Instrucciones del Ppot
