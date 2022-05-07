import { state } from "../../../state";

class addPendiente extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
    this.eventListeners();
  }
  eventListeners() {
    const currentState = state.getState();
    const formulario = this.shadow.querySelector(".formulario");
    const quitar = this.shadow.querySelector(".boton-quitar");
    // console.log(formulario);
    formulario.addEventListener("submit", (e) => {
      e.preventDefault();
      const infForm: any = e.target;

      //ZONA PARA EL ADD XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      const lastState = state.getState();
      const pendientes = lastState.notes.pendientes;
      const ids = pendientes.map((p) => p.id).length;
      // console.log(ids, "me");
      const valorForm: {
        pendiente: string;
        id: number;
        inputChecked: boolean;
      } = {
        pendiente: infForm.inputAgregar.value,
        id: ids + 1,
        inputChecked: false,
      };

      if (valorForm.pendiente != "") {
        state.addItem(valorForm);
        e.target["inputAgregar"].value = "";
      }
    });
    quitar.addEventListener("click", (e) => {
      e.preventDefault();
      const cs = state.getState();
      const pendientes = cs.notes.pendientes;
      const largo = pendientes.length;
      pendientes.pop(largo);
      state.setState(state.getState());
    });
  }
  render() {
    var style = document.createElement("style");
    style.textContent = `
      * {
          margin: 0;
          box-sizing: border-box;
      }
      form {
          min-height: 200px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          background: rgba(0, 108, 252, 1);
          padding: 0 5px;
      }
      @media (min-width: 480px) {
          form {
            padding: 0 10px;
          }
      }
      .input-agregar-tareas {
          width: 60vw;
          height: 50px;
          font-size: 24px;
          padding: 0px 5px;
      }
      .boton-agregar {
          font-size: 30px;
          background: rgba(0, 144, 72, 1);
          border-radius: 4px;
          width: 100px;
          height: 50px
      }
      .boton-quitar {
          font-size: 30px;
          background: rgba(0, 144, 72, 1);
          border-radius: 4px;
          width: 100px;
          height: 50px
      }
      .boton-quitar:hover {
        cursor: pointer;
      }
      .boton-agregar:hover {
          cursor: pointer;
      }
      `;
    this.shadow.appendChild(style);

    const form = document.createElement("form");
    form.classList.add("formulario");
    const input = document.createElement("input");
    input.setAttribute("placeholder", "Añade una tarea nueva");
    const button = document.createElement("button");
    const buttonLess = document.createElement("button");

    button.textContent = `+`;
    button.classList.add("boton-agregar");
    buttonLess.setAttribute("type", "button");
    buttonLess.textContent = `-`;
    buttonLess.classList.add("boton-quitar");
    input.classList.add("input-agregar-tareas");
    input.setAttribute("name", "inputAgregar");
    form.appendChild(buttonLess);
    form.appendChild(input);
    form.appendChild(button);
    this.shadow.appendChild(form);
  }
}
customElements.define("pendiente-el", addPendiente);
