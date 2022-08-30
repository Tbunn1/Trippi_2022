const html = String.raw;
const template = document.createElement('template');
template.innerHTML = html`
  <link rel="stylesheet" href="vendor/bootstrap.min.css">
  <script src="vendor/bootstrap.bundle.min.js"></script>
  <style>
    header {
      width: 90vw;
      z-index: var($zindex-fixed);
    }
    a.active {
      background: #0d6efd;
      border-radius: 5px;
    }
  </style>
  <header class="mb-auto p-3 fixed-top bg-dark w-100">
    <div>
      <h3 class="float-md-start mb-0">Trippi</h3>
      <nav class="nav nav-masthead justify-content-center float-md-end">
        <a id="home" class="nav-link" aria-current="page" href="/">Home</a>
        <a id="locations" class="nav-link" hidden disabled href="/locations.html">Locations</a>
        <a id="trips" class="nav-link" hidden disabled href="/trips.html">Trips</a>
        <a id="login" class="nav-link" href="/login.html">Login</a>
        <a id="profile" class="nav-link" hidden disabled href="/profile.html">Profile</a>
        <a id="signout" class="nav-link" hidden disabled>Signout</a>
      </nav>
    </div>
  </header>
`;

const RESTRICTED_ROUTES = [
  'profile',
  'trips',
  'locations',
  'signout'
];

class HeaderComponent extends HTMLElement {
  static isTokenExpired(token) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this._currentRoute = window.location.pathname.split('.')[0].split('/')[1];

    window.isLoggedIn = this.isLoggedIn;
    window.whoAmI = this.whoAmI;
    window.signOut = this.signOut;
  }

  get whoAmI() {
    return JSON.parse(localStorage.getItem('whoAmI')) || {};
  }

  get isLoggedIn() {
    const { token } = this.whoAmI;
    return token && !HeaderComponent.isTokenExpired(token)
  }

  get currentRoute() {
    return this._currentRoute || 'home';
  }

  setTabs() {
    const currentEle = this._shadowRoot.getElementById(this.currentRoute);
    currentEle.classList.add('active','text-dark');

    if (this.isLoggedIn) {
      const loginEle = this._shadowRoot.getElementById('login');
      loginEle.setAttribute('hidden', true);
      loginEle.setAttribute('disabled', true);

      RESTRICTED_ROUTES.map(route => {
        const element = this._shadowRoot.getElementById(route);
        element.removeAttribute('hidden');
        element.removeAttribute('disabled');
      });
    }

  }

  loaded() {
    setTimeout(() => {
      this.dispatchEvent(new CustomEvent('app-loaded', { bubbles: true, composed: true }));
    },0);
  }

  connectedCallback() {
    const children = template.content.cloneNode(true);
    this._shadowRoot.appendChild(children);

    const { token } = this.whoAmI;
    if (!this.isLoggedIn && RESTRICTED_ROUTES.includes(this.currentRoute)) {
      window.location.pathname = '/login.html';
    }

    this._shadowRoot.getElementById('signout').addEventListener('click', this.signOut);

    this.setTabs();
    this.loaded();
  }

  signOut() {
    localStorage.clear();
    window.location.pathname = '/login.html';
  }
}

customElements.define('header-component', HeaderComponent);
