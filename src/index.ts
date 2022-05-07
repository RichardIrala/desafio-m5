import { initRouter } from "./router";
import "./components/game-title/index.ts";
import "./components/game-button-blue/index.ts";
import "./components/PPoT/index.ts";
import "./components/game-results/index.ts";
import "./components/homepage-icon/index.ts";
import "./components/notes-components/notes-header-el/index.ts";
import "./components/notes-components/hoja-pendiente-el/index.ts";
import "./components/notes-components/pendiente-el/index.ts";
import { state } from "./state";
(function () {
  const root = document.querySelector(".root");
  state.init();
  localStorage.setItem("mod5-desafio", JSON.stringify(state.getState()));
  state.subscribe(() => {
    localStorage.setItem("mod5-desafio", JSON.stringify(state.getState()));
  });
  initRouter(root);

  window.onpopstate = function () {};
})();
