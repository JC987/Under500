// Homescreen.js
import React, { Component } from 'react';

import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAGAZ9I231stct1goF4ioAxmHxDiBzRwhI",
  authDomain: "testfirebase-7cbc0.firebaseapp.com",
  databaseURL: "https://testfirebase-7cbc0.firebaseio.com",
  projectId: "testfirebase-7cbc0",
  storageBucket: "testfirebase-7cbc0.appspot.com",
  messagingSenderId: "592835657404",
  appId: "1:592835657404:web:88a23f79a2045f281c9ab9"
};

firebase.initializeApp(firebaseConfig);

function ConfigFirbase({title, author, body, summary, nav}){
    return firebaseConfig;
}


export default firebaseConfig;