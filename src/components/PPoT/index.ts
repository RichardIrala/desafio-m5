import { state } from "../../state";
//ESTOS SON LOS IMPORT DE PIEDRA PAPEL O TIJERAS
//pero al hacer yarn build se arruinan. Se genera una dirección bien pero se añade un "/" al final y por ende no funciona. Solo pasa aca. El import del state se traduce bien
//Con esa logica hice en su momento una archivo ts para las imagenes en el mismo nivel que state.ts y tampoco funcionaba... Pero debe ser problema de la ubicación del componente PPoT
const piedra = require("url:../imgs/piedra.svg");
const papel = require("url:../imgs/papel.svg");
const tijera = require("url:../imgs/tijera.svg");

customElements.define(
  "ppot-el",
  class extends HTMLElement {
    jugada;
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      this.render();
      this.addEventsInPpot();
      const style = document.createElement("style");
      style.innerHTML = `
      .imgs-container {
        position: absolute;
        bottom: 0;
        right: 50%;
        transform: translate(50%, 0);
      }
      .ppot {
        height: 126px;
        width: auto;
      }
      .ppot:hover {
        cursor: pointer;
      }
      .miau {
        animation: viaje 2s;
      }
      @keyframes viaje {
        100% {
          transform: translate(0px, -50px);
        }
      }
      `;
      this.shadow.appendChild(style);
    }
    render() {
      const div = document.createElement("div");
      div.classList.add("imgs-container");
      div.innerHTML = `
      <img class="ppot" src=${piedra}>
      <img class="ppot" src=${papel}>
      <img class="ppot" src=${tijera}>
      `;
      this.shadow.appendChild(div);
    }
    setJugada(jugada: number) {
      this.jugada = jugada;
    }
    addEventsInPpot() {
      const ppotEls = this.shadow.querySelectorAll(".ppot");
      ppotEls.forEach((e, eIndex) => {
        e.addEventListener("click", () => {
          state.setJugada(eIndex);
          state.computerSetJugada(Math.floor(Math.random() * 3));
        });
      });
    }
  }
);
