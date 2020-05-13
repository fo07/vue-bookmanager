// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VeeValidate from "./validate";
import vuetify from "./plugins/vuetify";

const firebaseConfig = {
  apiKey: "AIzaSyCkTHdY2Bh2mwYQnWJ7XNHyoMXogRM7fto",
  authDomain: "vue-bookmanager-92bb4.firebaseapp.com",
  databaseURL: "https://vue-bookmanager-92bb4.firebaseio.com",
  projectId: "vue-bookmanager-92bb4",
  storageBucket: "vue-bookmanager-92bb4.appspot.com",
  messagingSenderId: "617716342624",
  appId: "1:617716342624:web:8e5fb157ad4859ee760805"
};

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  VeeValidate,
  vuetify,
  render: h => h(App)
}).$mount("#app");
