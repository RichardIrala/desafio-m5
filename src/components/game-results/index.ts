customElements.define(
  "game-results",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      this.render();
      const style = document.createElement("style");
      style.innerHTML = `
      .game-results__result {
        font-size: 55px;
        color: red;
      }
      `;
      this.shadow.appendChild(style);
    }
    render() {
      const div = document.createElement("div");
      div.innerHTML = `<span class="game-results__result">${this.textContent}</span>`;
      this.shadow.appendChild(div);
    }
  }
);
