const html = String.raw;
const footerTemplate = html`
<link rel="stylesheet" href="vendor/bootstrap.min.css">
<script src="vendor/bootstrap.bundle.min.js"></script>
<style>
  footer {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
</style>
<footer class="p-3 text-white-50">
  <p>Come Join Us!</p>
</footer>
`;

class FooterComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.createElement('template');
    template.innerHTML = footerTemplate;
    
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    const children = template.content.cloneNode(true);
    
    shadowRoot.appendChild(children);  
  }
}

customElements.define('footer-component', FooterComponent);
