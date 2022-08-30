const ATTRIBUTES = [
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

const getLocations = async () => {
  try {
    // fetch data
    const res = await fetch(window.trippi?.api + 'landmark', {
      credentials: 'include',
      headers: {
        ...window.trippi?.getHeaders()
      }
    });
    const data = await res.json();

    if (!res.ok && (res.status === 401 || res.status === 400)) {
      window.openNotification('Token expired.');
      window.signOut();
    }

    const locationWrapper = document.getElementById('locations-wrapper');
    
    data?.forEach((location) => {
      const locationelement = document.createElement('landmark-component');

      ATTRIBUTES.forEach(attr => {
        locationelement.setAttribute(attr, location[attr])
      });
      locationWrapper.appendChild(locationelement);
    });
  } catch (error) {
    window.openNotification(error?.message || error?.error || error);
    console.error(error?.message || error?.error || error);
  }
}


const onLoad = () => {
  getLocations();
}

window.addEventListener('app-loaded', onLoad);
