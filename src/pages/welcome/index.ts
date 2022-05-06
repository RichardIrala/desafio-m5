export function pageWelcome(params: any) {
  const root = document.querySelector(".root");
  root.innerHTML = ``;
  const divPadre = document.createElement("div");
  const span = document.createElement("span");
  span.innerHTML = `HOLA`;
  span.addEventListener("click", () => {
    console.log("a");
    params("/game-homepage");
  });

  divPadre.appendChild(span);
  root.appendChild(divPadre);

  //listener que envia hacía el inicio del juego de piedra papel y tijeras
  divPadre.addEventListener("click", () => {});
}
//Bienvenida, con mi presentación (? el desafio no lo pide pero estaría bueno)
//revisar el paint
