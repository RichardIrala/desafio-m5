const computadoraIcon = require("url:../../components/imgs/computadora-icon.svg");
const submitIcon = require("url:../../components/imgs/submit-icon.svg");

export function pageWelcome(params: any) {
  const root = document.querySelector(".root");
  root.innerHTML = ``;
  const divPadre = document.createElement("div");
  const buttonEl = document.createElement("button");
  buttonEl.textContent = `Inicio Game`;
  buttonEl.addEventListener("click", () => {
    console.log("a");
    params("/game-homepage");
  });
  //
  const divTEMPORAL = document.createElement("div");
  divTEMPORAL.innerHTML = `
  <div class="header-all-content-container">
    <div class="header--my-name-container">
      <span>Richard Miguel Irala</span>
      <img class="computadora-icon" src=${computadoraIcon} alt="computadora logo">
    </div>
    <form class="header__form">
      <div class="header__form__inputs">
        <select class="header__form__inputs--select" name="headerForm">
          <option value="contactarme">Contactarme</option>
          <option value="jugar" selected>Jugar Piedra papel o Tijeras</option>
          <option value="anotador">Anotar tareas pendientes</option>
        </select>
        <input class="submit-icon" type="image" src=${submitIcon}>
      </div>
      <div class="header__form__spanText">
       <span>Elige una de las opciones y presiona el botón</span>
      </div>
    </form>
  </div>

  <div class="main-container">
    <div class="main-columns">
      <h2 class="main-columns__titulo color-white">Esta página tiene distintas funcionalidades</h2>
      <div class="main-column">
          <div class="main-column__number color-white">
            <span>1</span>
          </div>
          <div class="main-column__titulo color-white">
            <h3>Un juego de piedra papel o tijera</h3>
          </div>
          <div class="main-column__imagen-container color-white">
            <img class="main-column__imagen" src=${computadoraIcon} alt="">
            <span>Este juego consta de jugar 1v1 contra la computadora al típico juego de piedra papel y tijeras<span>
          </div>
        
      </div>
      
    </div>
  </div>
  `;
  //AUTOMATIZAR EL CUADRO, USAR UN OBJETO PARA GESTIONARLO
  // divPadre.appendChild(buttonEl);
  divPadre.appendChild(divTEMPORAL);
  root.appendChild(divPadre);
  const style = document.createElement("style");
  style.innerHTML = `
    * {
      margin: 0px;
      box-sizing: border-box;
    }
    .header-all-content-container {
      background: rgba(0, 144, 72, 1);
      color: white;
      padding: 20px;
      display: grid;
      grid-template-rows: auto auto;
      justify-content: center;
      justify-items: center;
      gap: 5px;
    }
    .header--my-name-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: fit-content;
    }
    .computadora-icon {
      width: 60px;
      margin-top: 10px;
    }


    .header__form {
      display: flex;
      flex-direction: column;
    }
    .header__form__inputs {
      display: flex;
      align-items: center;
      transform: translate(50px, 0);
    }
    .header__form__inputs--select {
      height: 40px;
      width: 200px;
    }
    .submit-icon {
      width: 50px; height: 50px;
      transform: rotate(180deg);

    }
    .header__form__spanText {
      text-align: center;
    }


    .main-container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background: grey;
      min-height: 100vh;
      padding: 40px 0;
    }
    .main-columns {

    }
    .main-columns__titulo {
      background: rgba(0, 144, 72, 1);
      border: solid black;
      font-size: 26px;
      padding: 10px;
      width: 440px;
      text-align: center;
    }
    .main-column {
      display: grid;
      grid-template:
        "number titulo" 50px
        "number imagen" 400px /
        40px 400px
    }
    .color-white {
      color: white;
    }
    .main-column__imagen {
      width: 300px;
    }
              .main-column__number { grid-area: number; display: flex; justify-content: center; align-items: center; background: rgba(0, 144, 72, 1);  border: solid black;}
              .main-column__titulo { grid-area: titulo; display: flex; justify-content: center; align-items: center; background: rgba(0, 108, 252, 1); border: solid black;}
    .main-column__imagen-container { grid-area: imagen; display: flex; justify-content: center; align-items: center; background: rgba(0, 108, 252, 1); border: solid black; flex-direction: column; padding: 20px; gap: 20px;}
  `;
  divPadre.appendChild(style);
  //listener que envia hacía el inicio del juego de piedra papel y tijeras
  divPadre.addEventListener("click", () => {});

  console.log(divPadre);
  //EVENTO DEL SUBMIT DE LAS OPCIONES DEL HEADER
  divPadre.querySelector(".header__form").addEventListener("submit", (e) => {
    e.preventDefault();
    const valorDelForm = e.target["headerForm"].value;
    if (valorDelForm == "contactarme") {
      console.log("CONTACTADOWEY");
    } else if (valorDelForm == "jugar") {
      params("/game-homepage");
    } else if (valorDelForm == "anotador") {
      console.log("ANOTADOR? DE UNA BRO que campeon es ese?");
    }
  });
}
//Bienvenida, con mi presentación (? el desafio no lo pide pero estaría bueno)
//revisar el paint
