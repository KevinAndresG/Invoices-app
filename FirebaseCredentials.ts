import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCa-c5SYF60oo8vLd-XdZ3JGVgrUzTHM20',
  authDomain: 'invoice-generator-26a81.firebaseapp.com',
  projectId: 'invoice-generator-26a81',
  storageBucket: 'invoice-generator-26a81.appspot.com',
  messagingSenderId: '754058330948',
  appId: '1:754058330948:web:20d213ba7ad3d20b700d11',
};

// Initialize Firebase
export const FireBaseApp = initializeApp(firebaseConfig);
