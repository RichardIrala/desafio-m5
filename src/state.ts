import { createHistogram } from "perf_hooks";
const piedra = require("url:./components/imgs/piedra.svg");
const papel = require("url:./components/imgs/papel.svg");
const tijera = require("url:./components/imgs/tijera.svg");
const state = {
  data: {
    notes: { pendientes: [] },
    game: {
      play: {
        myPlay: "",
        computerPlay: "",
      },
      gamesStatus: {
        victorys: 0,
        losses: 0,
      },
      listeners: [],
    },
  },
  listeners: [],

  consola() {
    console.log(state.data.game.play);
  },
  init() {
    // Busco data existente en el localStorage
    const localData = JSON.parse(localStorage.getItem("mod5-desafio"));

    if (!localData) {
      // Si no hay data, que no haga nada
      return;
    }
    // Pero si la hay, que la setee en el estado
    this.setState(localData);
  },
  getState() {
    return this.data;
  },
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      // console.log("SOy yo", cb);
      cb();
    }
  },
  subscribe(callback: (any) => any) {
    console.log("hecho");
    this.listeners.push(callback);
  },

  addItem(item: { pendiente: string; id: number; inputChecked: boolean }) {
    //currentState = cs
    const cs = this.getState();
    // console.log(cs);
    cs.notes.pendientes.push(item);
    this.setState(cs);
    console.log(state.getState());
  },
  removeItem(itemIndex) {
    const cs = state.getState();
    const pendientes = cs.notes.pendientes;
    const resultado = pendientes.filter((p) => {
      return p.id != pendientes[itemIndex].id;
    });
    //Este forEach lo que hace es actualizar todos los id de los pendientes. Para que al añadir uno nuevo no se repitan IDs
    resultado.forEach((r, i) => {
      r.id = i + 1;
    });
    cs.notes.pendientes = resultado;
    for (const cb of this.listeners) {
      cb();
    }
  },
  updateStatusInput(value: any, index: number) {
    const cs = this.getState();
    const pendientes = cs.notes.pendientes;
    pendientes[index].inputChecked = value;
    localStorage.setItem("mod5-desafio", JSON.stringify(state.getState()));
    // for (const cb of this.listeners) {
    //   cb();
    // }
  },
  //A partir de aca estan todos los comandos del state para el juego
  resetJugadas() {
    // console.log("DHSAJDGHSAJ");
    const cs = this.getState();
    cs.game.play.myPlay = "";
    cs.game.play.computerPlay = "";
    console.log(cs);
    this.setState(cs);
  },
  setJugada(jugada: number) {
    const cs = this.getState();
    cs.game.play.computerPlay = "";
    cs.game.play.myPlay = "";
    var myPlay;
    if (jugada == 0) {
      myPlay = "piedra";
    } else if (jugada == 1) {
      myPlay = "papel";
    } else if (jugada == 2) {
      myPlay = "tijera";
    }
    cs.game.play.myPlay = myPlay;
    this.setState(cs);
  },
  computerSetJugada(jugada: number) {
    const cs = this.getState();
    var computerPlay;
    if (jugada == 0) {
      computerPlay = "piedra";
    } else if (jugada == 1) {
      computerPlay = "papel";
    } else if (jugada == 2) {
      computerPlay = "tijera";
    }
    cs.game.play.computerPlay = computerPlay;
    this.setState(cs);
    //Aca no necesito hacer el setState porque setJugada ya lo hace. Y ambas van de la mano
  },
  addPuntos(pointForWho: "pc" | "player") {
    const cs = this.getState();
    const gameStatus = cs.game.gamesStatus;
    if (pointForWho == "player") {
      gameStatus.victorys = gameStatus.victorys + 1;
      console.log(cs, "RESULTADO DE LAS VICTORIAS CS");
      this.setState(cs);
    } else if (pointForWho == "pc") {
      gameStatus.losses = gameStatus.losses + 1;
      console.log(cs, "RESULTADO DE LAS DERROTAS CS");
      this.setState(cs);
    } else {
      alert("error");
    }
  },
  renderAnimationCombat() {
    const root = document.querySelector(".root");
    const style = document.createElement("style");
    style.innerHTML = `
    .pc-play-now {
      position: absolute;
      top: -10vh;
      left: 50%;
      transform: rotate(180deg) translate(50%);
      height: 45vh;
      animation: pcMove 2s linear;
    }
    @keyframes pcMove {
      100% {
        top: 0;
      }
    }
    .pc-play-fast {
      position: absolute;
      top: -10vh;
      left: 50%;
      transform: rotate(180deg) translate(50%);
      height: 10vh;
      animation: pcMoveFast 2s linear;
      z-index: 2;
    }
    @keyframes pcMoveFast {
      100% {
        top: 100vh;
      }
    }
    .player-play-now {
      position: absolute;
      bottom: -10vh;
      left: 50%;
      transform: translate(-50%);
      height: 45vh;
      animation: playerMove 2s linear;
    }
    
    @keyframes playerMove {
      100% {
        bottom: 0;
      }
    }
    .player-play-fast {
      position: absolute;
      bottom: -10vh;
      left: 50%;
      transform: translate(-50%);
      height: 10vh;
      animation: playerMoveFast 2s linear;
    }
    @keyframes playerMoveFast {
      100% {
        bottom: 100vh;
      }
    }
    `;
    const jugadas = this.getState().game.play;
    function pcPlay() {
      if (jugadas.computerPlay == "piedra") {
        return piedra;
      } else if (jugadas.computerPlay == "papel") {
        return papel;
      } else {
        return tijera;
      }
    }
    function playerPlay() {
      if (jugadas.myPlay == "piedra") {
        return piedra;
      } else if (jugadas.myPlay == "papel") {
        return papel;
      } else {
        return tijera;
      }
    }
    console.log(jugadas, "sSOMOSMOSMOS");
    jugadas.myPlay != ""
      ? (root.innerHTML = `
      <img class="pc-play-now" src=${pcPlay()}>
      <img class="pc-play-fast" src=${pcPlay()}>
      <img class="player-play-now" src=${playerPlay()}>
      <img class="player-play-fast" src=${playerPlay()}>
      `)
      : (root.innerHTML = `NO JUGASTE BRO`);
    root.appendChild(style);
  },
  renderGanador() {
    // for (const cb of this.listener) {
    //   cb();
    // }
    const root = document.querySelector(".root");
    root.innerHTML = ``;
    //
    const jugadas = this.getState().game.play;
    const victoriaConPiedra = [
      jugadas.myPlay == "piedra" && jugadas.computerPlay == "tijera",
    ];

    const victoriaConPapel = [
      jugadas.myPlay == "papel" && jugadas.computerPlay == "piedra",
    ];
    const victoriaConTijera = [
      jugadas.myPlay == "tijera" && jugadas.computerPlay == "papel",
    ];
    const victoria = [victoriaConPiedra, victoriaConPapel, victoriaConTijera]
      .toString()
      .includes("true");
    //
    const empateConPiedra = [
      jugadas.myPlay == "piedra" && jugadas.computerPlay == "piedra",
    ];
    const empateConPapel = [
      jugadas.myPlay == "papel" && jugadas.computerPlay == "papel",
    ];
    const empateConTijera = [
      jugadas.myPlay == "tijera" && jugadas.computerPlay == "tijera",
    ];
    const empate = [empateConPapel, empateConPiedra, empateConTijera]
      .toString()
      .includes("true");
    //
    const derrotaConPiedra = [
      jugadas.myPlay == "piedra" && jugadas.computerPlay == "papel",
    ];
    const derrotaConPapel = [
      jugadas.myPlay == "papel" && jugadas.computerPlay == "tijera",
    ];
    const derrotaConTijera = [
      jugadas.myPlay == "tijera" && jugadas.computerPlay == "piedra",
    ];
    const derrota = [derrotaConPiedra, derrotaConPapel, derrotaConTijera]
      .toString()
      .includes("true");

    //Si no selecciono nada la jugada de la computadora va a ser = a undefined ("")
    const computerActualPlay = state.getState().game.computerPlay;
    if (victoria.toString() == "true") {
      //ACA SE AGREGAN PUNTOS AL JUGADOR
      this.addPuntos("player");
      root.innerHTML = `<game-results>Ganaste</game-results>`;
    } else if (empate.toString() == "true") {
      root.innerHTML = `<game-results>Empate</game-results>`;
    } else if (derrota.toString() == "true") {
      //ACA SE AGREGAN PUNTOS A LA PC
      this.addPuntos("pc");
      root.innerHTML = `<game-results>Perdiste</game-results>`;
    } else {
      root.innerHTML = `<game-results>ELEGI ALGO</game-results>`;
    }
  },
};
export { state };
