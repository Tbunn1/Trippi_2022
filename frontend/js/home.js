const onLoad = () => {
  if (window.isLoggedIn) {
    const mainActionBtn = document.getElementById('main-action-btn');

    mainActionBtn.innerText = 'Browse Locations';
    mainActionBtn.href = '/locations.html';
  }
}

window.addEventListener('app-loaded', onLoad);
