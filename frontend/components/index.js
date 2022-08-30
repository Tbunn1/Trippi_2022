const templates = [
  'components/header-component.js',
  'components/footer-component.js',
  'components/notification-component.js',
  'components/landmark-component.js'
];

const onload = () => {
  const head = document.getElementsByTagName('head')[0];
  console.log('Loading all components');
  templates.forEach(template => {
    const link = document.createElement('script');
    link.type = 'module';
    link.src = template;
    link.async = true;
    head.appendChild(link);
  });

  const whoAmI = JSON.parse(localStorage.getItem('whoAmI'))
  window.trippi = {
    server: 'http://0.0.0.0:8080',
    api: 'http://0.0.0.0:8080/api/v1/',
    token: whoAmI?.token,
    userId: whoAmI?.userId,
    getHeaders: () => {
      if (whoAmI?.token) {
        return {
          'x-access-token': whoAmI.token
        }
      }
      return {};
    }
  }

  console.log('All components loaded');
};


window.addEventListener('load', onload);
