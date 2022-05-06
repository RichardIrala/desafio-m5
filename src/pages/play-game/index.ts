import { state } from "../../state";

const fondoDelJuego = require("url:../../components/imgs/fondo.svg");
export function gamePage() {
  const root = document.querySelector(".root");
  const div = document.createElement("div");
  div.classList.add("principal-container");
  const style = document.createElement("style");
  root.innerHTML = ``;
  div.innerHTML = `
  <ppot-el></ppot-el>
  `;
  style.innerHTML = `
  .play-game__contador-container {
    display: flex; justify-content: center; align-items: center;
    width: 243px; height: 243px;
    font-size: 64px;
    position: absolute; top: 50%; transform: translate(0 , -50%);
    border-radius: 50%;
    background: red;
  }
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

  root.appendChild(div);
  root.appendChild(style);

  let counter = 3;
  const divDelSpan = document.createElement("div");
  divDelSpan.classList.add("play-game__contador-container");
  div.appendChild(divDelSpan);
  state.resetJugadas();
  const intervalId = setInterval(() => {
    divDelSpan.textContent = counter.toString();
    counter--;
    if (counter < 1) {
      clearInterval(intervalId);
      setTimeout(() => {
        //Se remueve el contador
        div.removeChild(divDelSpan);
        // Este params le envia el goTo al renderGanador para que al clickear VOLVER A JUGAR le recargue la página
        state.renderGanador();
        state.consola();
      }, 500);
    }
  }, 1000);
  //state.resultado y state.getJugada
}
//juego de piedra papel o tijeras
