import { gameIntructionsPage } from "./pages/game-instructions";
import { pageInicioGame } from "./pages/inicioGame";
import { notesPage } from "./pages/notes";
import { gamePage } from "./pages/play-game";
import { pageWelcome } from "./pages/welcome";

const BASE_PATH = "/desafio-m5";

function isGithubPages() {
  return location.host.includes("github.io");
}

export function initRouter(container: Element) {
  function goTo(path) {
    // el goTo va a recibir la ruta de siempre: /jugar
    // por eso, en el caso de GitHub Pages
    // debemos anteponerle el BASE_PATH para que funcione
    // en ese contexto
    const completePath = isGithubPages() ? BASE_PATH + path : path;
    history.pushState({}, "", completePath);
    handleRoute(completePath);
  }
  function handleRoute(route) {
    const routes = [
      {
        path: /\//,
        component: pageWelcome,
      },
      {
        path: /\/game-homepage/,
        component: pageInicioGame,
      },
      {
        path: /\/game-instructions/,
        component: gameIntructionsPage,
      },
      {
        path: /\/play-game/,
        component: gamePage,
      },
      {
        path: /\/notes/,
        component: notesPage,
      },
    ];
    console.log("El handleRoute recibió una nueva ruta", route);
    const newRoute = isGithubPages() ? route.replace(BASE_PATH, "") : route;
    // newRoute entonces ya no tiene el BASE_PATH
    // y podemos seguir procesando la ruta como siempre

    // resto del router...
    for (const r of routes) {
      if (r.path.test(route)) {
        r.component(goTo);
      }
    }
    window.onpopstate = function () {
      handleRoute(location.pathname);
      // console.log("cambio");
    };
  }
  handleRoute(location.pathname);
}
