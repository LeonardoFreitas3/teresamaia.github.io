class LanguageToggle extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>
                button {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    background-color: var(--sage);
                    color: white;
                    border-radius: 9999px;
                    font-size: 0.875rem;
                    transition: background-color 0.2s;
                    border: none;
                    cursor: pointer;
                }
                button:hover {
                    background-color: var(--lightblue);
                }
                i {
                    width: 1rem;
                    height: 1rem;
                }
            </style>
            <button id="toggleButton">
                <span id="languageText">PT</span>
                <i data-feather="refresh-cw"></i>
            </button>
        `;

    const button = this.shadowRoot.getElementById("toggleButton");
    const languageText = this.shadowRoot.getElementById("languageText");

    button.addEventListener("click", () => {
      const currentLang = languageText.textContent;
      const newLang = currentLang === "PT" ? "FR" : "PT";
      languageText.textContent = newLang;

      // Dispatch event to notify parent of language change
      this.dispatchEvent(
        new CustomEvent("languageChange", {
          detail: { language: newLang.toLowerCase() },
        })
      );

      feather.replace();
    });

    // Initialize feather icons
    feather.replace();
  }
}

customElements.define("language-toggle", LanguageToggle);
