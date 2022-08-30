const html = String.raw;
const template = document.createElement('template');
template.innerHTML = html`
  <link rel="stylesheet" href="vendor/bootstrap.min.css">
  <script src="vendor/bootstrap.bundle.min.js"></script>
  <style>
    #alert-container {
      z-index: 1070;
      position: absolute;
      top: 4em;
      width: 100%;
      display: flex;
      justify-content: center;
    }
  </style>
  <div id="alert-container" hidden>
    <div id="alert-item" class="alert alert-dismissible">
      <span id="alert-message">HI</span>
      <button
        id="close-notification"
        type="button"
        class="btn-close"
        aria-label="Close"></button>
    </div>
  </div>
`;


class NotificationComponent extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this._isHidden = true;
    this._alertType = 'alert-danger';

    window.openNotification = this.openNotification.bind(this);
    this.close = this.close.bind(this);
  }

  openNotification(message='', type='alert-danger') {
    this._isHidden = false;

    this._alertType = type; 
    this._shadowRoot.getElementById('alert-message').innerText = message;
    this._shadowRoot.getElementById('alert-item').classList.remove(this._alertType);
    this._shadowRoot.getElementById('alert-item').classList.add(type);
    this._shadowRoot.getElementById('alert-container').removeAttribute('hidden');
  }

  close() {
    this._isHidden = true;
    
    this._shadowRoot.getElementById('alert-container').setAttribute('hidden', true);
    this._shadowRoot.getElementById('alert-item').classList.remove(this._alertType);
    this._shadowRoot.getElementById('alert-message').innerText = '';

    this._alertType = '';
  }

  connectedCallback() {
    const children = template.content.cloneNode(true);
    this._shadowRoot.appendChild(children);

    this._shadowRoot.getElementById('close-notification').addEventListener('click', this.close);
  }
}

customElements.define('notification-component', NotificationComponent);
