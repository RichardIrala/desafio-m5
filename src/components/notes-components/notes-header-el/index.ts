class Header extends HTMLElement {
  shadow = this.attachShadow({
    mode: "open",
  });
  constructor() {
    super();
    this.render();
  }
  render() {
    const HTMLContent = this.textContent;
    var nuevoEl = document.createElement("div");
    nuevoEl.classList.add("header");
    nuevoEl.innerHTML = `<h2 class="header--title">${HTMLContent}</h2>`;
    const style = document.createElement("style");
    style.textContent = `
      * {
          margin: 0;
          padding: 0;
      }
      .header {
        width: 100%;
        padding: 17px 0px;
        display: flex;
        justify-content: center;
        background: rgba(0, 144, 72, 1);
      }
      .header--title {
        font-size: 22px;
      }
      `;
    this.shadow.appendChild(nuevoEl);
    this.shadow.appendChild(style);
  }
}
customElements.define("notes-header-el", Header);
