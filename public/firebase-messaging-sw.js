importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDxgqi9beqrM_L-LFVWsG1Njq0QBQ5C7I4",
  authDomain: "barcha-medicous.firebaseapp.com",
  projectId: "barcha-medicous",
  storageBucket: "barcha-medicous.firebasestorage.app",
  messagingSenderId: "351174899452",
  appId: "1:351174899452:web:7198e4509710b7fec20979",
  measurementId: "G-77LNJWGRTX"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
