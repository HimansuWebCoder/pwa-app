// document.getElementById('notification-button').addEventListener('click', () => {
//   new Notification('Hello! This is a PWA notification.');
// });

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js').then((registration) => {
//       console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     }, (error) => {
//       console.log('ServiceWorker registration failed: ', error);
//     });
//   });
// }

document.getElementById('notification-button').addEventListener('click', () => {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      new Notification('Hello! This is a PWA notification.');
    }
  });
});

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  document.getElementById('install-button').style.display = 'block';

  document.getElementById('install-button').addEventListener('click', () => {
    document.getElementById('install-button').style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  });
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, (error) => {
      console.log('ServiceWorker registration failed: ', error);
    });
  });
}

navigator.serviceWorker.ready.then((registration) => {
  return registration.sync.register('sync-tag');
});

document.addEventListener('DOMContentLoaded', () => {
  const lazyLoadImages = document.querySelectorAll('.lazy-load');

  const lazyLoad = (target) => {
    const options = {
      root: null,
      threshold: 0
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          img.setAttribute('src', src);
          observer.disconnect();
        }
      });
    }, options);

    observer.observe(target);
  };

  lazyLoadImages.forEach(image => lazyLoad(image));
});
