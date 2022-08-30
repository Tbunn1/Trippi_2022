const html = String.raw;
const landmarkTemplate = html`
<link rel="stylesheet" href="vendor/bootstrap.min.css">
<script src="vendor/bootstrap.bundle.min.js"></script>
<style>
  #image {
    max-width: 100%;
  }
</style>
<div class="p-3">
  <img id="image"/>
  <h2 id="name"></h2>
</div>
`;

class LandmarkComponent extends HTMLElement {
  static get observedAttributes() {
    return [
      'image',
      'name',
      'description',
      'city',
      'state',
      'zipCode',
      'country',
      'latitude',
      'longitude',
      'likes'
    ];
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'closed' });
  }

  connectedCallback() {
    const template = document.createElement('template');
    template.innerHTML = landmarkTemplate;
    const children = template.content.cloneNode(true);

    LandmarkComponent.observedAttributes.forEach(attr => {
      const element = children.getElementById(attr);
      switch (attr) {
        case 'image':
          
          element.setAttribute('src', `${window.trippi?.server}${this.getAttribute(attr)}`);
          break;
        default:
          if (element) {
            element.innerText = this.getAttribute(attr); 
          }
      }
    });
    
    this._shadowRoot.appendChild(children); 
  }
}

customElements.define('landmark-component', LandmarkComponent);
