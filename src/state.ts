import { createHistogram } from "perf_hooks";

const state = {
  data: {
    notes: { pendientes: [] },
    game: {
      play: {
        myPlay: "",
        computerPlay: "",
      },
      gamesStatus: {
        victorys: "",
        losses: "",
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
    // const cs = this.getState();
    // cs.game.myPlay = "";
    // cs.game.computerPlay = "";
    // console.log(cs);
    // this.setState(cs);
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
    console.log(empate, "DEROOTA DSA");
    //Si no selecciono nada la jugada de la computadora va a ser = a undefined ("")
    const computerActualPlay = state.getState().game.computerPlay;
    if (victoria.toString() == "true") {
      root.innerHTML = `<game-results>Ganaste</game-results>`;
    } else if (empate.toString() == "true") {
      root.innerHTML = `<game-results>Empate</game-results>`;
    } else if (derrota.toString() == "true") {
      root.innerHTML = `<game-results>Perdiste</game-results>`;
    } else {
      root.innerHTML = `<game-results>ELEGI ALGO</game-results>`;
    }
  },
};
export { state };
