import { state } from "../../../state";

const imagen = require("url:../../imgs/borrar.svg");
// const fondoDeLasNotas = require("url:../../imgs/fondo.svg");
// import imagen from "../../../imgs/borrar.png";
console.log(
  `%c───▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄───
  ───█▒▒░░░░░░░░░▒▒█───
  ────█░░█░░░░░█░░█────
  ─▄▄──█░░░▀█▀░░░█──▄▄─
  █░░█─▀▄░░░░░░░▄▀─█░░█
  █▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█
  █░░╦─╦╔╗╦─╔╗╔╗╔╦╗╔╗░░█
  █░░║║║╠─║─║─║║║║║╠─░░█
  █░░╚╩╝╚╝╚╝╚╝╚╝╩─╩╚╝░░█
  █▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█
  `,
  "color: red; font-size: 32px"
);
// import * as tachitoBorrar from  "../../imgs/borrar.png";
class addHojaPendiente extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });
  constructor() {
    super();
    this.render();
  }
  connectedCallback() {
    state.subscribe(() => {
      // console.log(state.getState(), "aaa");
      this.reset();
      this.render();
      this.escuchadorDeEventos();
    });
  }
  reset() {
    this.shadow.innerHTML = "";
  }
  escuchadorDeEventos() {
    const tachito = this.shadow.querySelectorAll(".remove-icon");
    const input = this.shadow.querySelectorAll(".input");
    // console.log(input[0]);
    const idDeNota = this.shadow.querySelectorAll(".id-note");
    tachito.forEach((element, index) => {
      element.addEventListener("click", () => {
        console.log(idDeNota[index], 2);
        state.removeItem(index);
      });
    });
    input.forEach((element, index) => {
      element.addEventListener("click", (e) => {
        const value = e.target["checked"];
        if (value == true) {
          state.updateStatusInput("true", index);
          const lista = this.shadow.querySelectorAll(".listas");
          lista[index].classList.add("tachado");
        } else {
          state.updateStatusInput("false", index);
          const lista = this.shadow.querySelectorAll(".listas");
          lista[index].classList.remove("tachado");
        }
      });
    });
    //AÑADIR LECTOR DEL LOCAL para tachar las tareas hechas
    //.
    //.
  }
  render() {
    // console.log(state.getState().list, "leame ahora mismo holiis");
    const cs = state.getState();

    // console.log(list, "hi bebe soy io");
    var style = document.createElement("style");
    style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
        * {
          margin: 0;
          box-sizing: border-box;
        }
        .div-principal {
            padding: 20px;
            min-height: 80vh;
            background: grey;
            display: grid;
            justify-content: center;
        }
        .all-content-container {
          display: grid;
          gap: 10px;
          height: fit-content;
          width: 80vw;
        }
        @media (min-width: 768px) {
          .all-content-container {
            grid-template-columns: 1fr 1fr;
            gap: 20px
          }
        }
        @media (min-width: 1280px) {  
          .all-content-container {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }
        .nota {
          padding: 10px;
          background: rgba(0, 144, 72, 1);
          width: 100%;
          
          display: grid;
          grid-template-columns: auto 60px;
        }
        @media (min-width: 768px) {
          .nota {
            padding: 20px;
          }
        }
        .listas {
          list-style-type: none;
          color:white;
          font-family: 'Pacifico', cursive;
          font-weight: 400;
          font-size: 20px;
        }
        @media (min-width: 768px) {
          .listas {
            font-size: 26px
          }
        }
        .tachado {text-decoration:line-through}
        .input-and-remove {
          display: flex;
          flex-direction: column;
          gap: 30px;
          align-items: center;
        }
        .input {
          width: 35px;
          height: 35px;
        }
        .remove-icon {
          width: 40px
        }
        .remove-icon:hover, .input {
          cursor: pointer;
        }
        `;
    this.shadow.appendChild(style);
    const data = cs.notes;
    const div = document.createElement("div");
    const urlImagen = "../../imgs/borrar.png";
    div.classList.add("div-principal");
    div.innerHTML = `
      <div class="all-content-container">
      ${data.pendientes
        .map((item) => {
          const chequeado = (function () {
            if (item.inputChecked == "true") {
              return `checked="true"`;
            } else {
              return "";
            }
          })();
          return `
          <div class="nota">
            <li class="listas">${item.pendiente}</li>
            <div class="input-and-remove">
            <input class="input" type="checkbox" ${chequeado}></input>
            <h2 class="id-note">ID:${item.id}</h2>
            <img class="remove-icon" src="${imagen}"/>
            </div>
          </div>
        `;
        })
        .join("")}
      </div>
      `;

    this.shadow.appendChild(div);
  }
}
customElements.define("hoja-pendiente-el", addHojaPendiente);
// console.log(state.getState().list, "leame ahora mismo xd");
