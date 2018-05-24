'use strict';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('./worker.js').then(function (registered) {
      console.log('ServiceWorker registration successful');
    }).catch(function (err) {
      console.log('ServiceWorker registration failed', err);
    });
  });
}
