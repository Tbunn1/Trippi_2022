
// switch used for displaying login or signup
let isLoginActive = true;

const toggleCards = () => {
  if (isLoginActive) {
    const cardEle = document.getElementById('login-card');
    const signupCard = document.getElementById('signup-card');
    cardEle.setAttribute('hidden', true);
    signupCard.removeAttribute('hidden');
  } else {
    const cardEle = document.getElementById('login-card');
    const signupCard = document.getElementById('signup-card');
    signupCard.setAttribute('hidden', true);
    cardEle.removeAttribute('hidden');
  }

  isLoginActive = !isLoginActive;
}

// Event listener function
const toggleCardsEvent = (event) => {
  event.preventDefault();
  toggleCards();
}


/*
  Callback for submitting login
*/
const submitLogin = async (event) => {
  event.preventDefault();
  const formEle = document.getElementById('login-form');
  const inputs = formEle.elements;

  const username = inputs['username'];
  const password = inputs['password'];

  if (username.value || password.value) {
    try {
      const res = await fetch(window.trippi?.api + 'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value
        })
      });
      const body = await res.json();
      console.log(body, )
      if (res.ok) {
        localStorage.setItem('whoAmI', JSON.stringify(body));
        window.location.pathname = '/locations.html';
      } else {
        window.openNotification(body.message || body.error);
      }

    } catch (error) {
      window.openNotification(error);
      console.error(error);
      
    }
  } else {
    window.openNotification('Please provide both username and password');
  }
};

/*
  callback for signing up
*/
const sumbitSignup = async (event) => {
  event.preventDefault();
  const formEle = document.getElementById('signup-form');

  window.formEle = formEle
  const inputs = formEle.elements;
  
  const {
    username,
    password,
    country,
    image
  } = inputs;
  
  const body = new FormData();
  body.append('username', username.value);
  body.append('password', password.value);
  body.append('country', country.value);
  body.append('image', image.files[0]);

  try {
    const res = await fetch(this.trippi?.api + 'user', {
      method: 'POST',
      body
    });
    const data = await res.json();

    if (res.ok) {
      if (data?.username && data?.country) {
        toggleCards();
        username.value = '';
        password.value = '';
        country.value = '';
        image.value = '';
        window.openNotification(`The account ${data?.username} from ${data?.country} has been created. Please login with your password.`, 'alert-success');
      } else {
        window.openNotification('Whoops something went wrong. Please try again');
      }
    } else {
      window.openNotification(data?.message || data?.error);
    }
  } catch (error) {
    window.openNotification(error?.message || error?.error || error);
    console.error(error?.message || error?.error || error);
  }
}

const onLoad = () => {
  const formEle = document.getElementById('login-form');
  formEle.addEventListener('submit', submitLogin);

  const signupForm = document.getElementById('signup-form');
  signupForm.addEventListener('submit', sumbitSignup);

  document.getElementById('flip-to-signup').addEventListener('click', toggleCardsEvent);
  document.getElementById('flip-to-login').addEventListener('click', toggleCardsEvent);
}

window.addEventListener('app-loaded', onLoad);