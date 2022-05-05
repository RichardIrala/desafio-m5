export function pageWelcome() {
  const root = document.querySelector(".root");
  root.innerHTML = ``;
  const divPadre = document.createElement("div");
  divPadre.innerHTML = `
    Hola
    `;
  root.appendChild(divPadre);

  //listener que envia hacía el inicio del juego de piedra papel y tijeras
  divPadre.addEventListener("click", () => {});
}
//Bienvenida, con mi presentación (? el desafio no lo pide pero estaría bueno)
//revisar el paint
