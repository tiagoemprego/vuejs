import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as firebase from "firebase";
import VueFirebase from 'vue-firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDuitVYalaeGStDa_osdBZZoV6CqXeOc1k",
  authDomain: "primeiro-projeto-tiago.firebaseapp.com",
  databaseURL: "https://primeiro-projeto-tiago.firebaseio.com",
  projectId: "primeiro-projeto-tiago",
  storageBucket: "primeiro-projeto-tiago.appspot.com",
  messagingSenderId: "884802486609",
  appId: "1:884802486609:web:b1e5c8d268209d113ad370",
  measurementId: "G-TDKEWT8RLD"
};


//Styles
import './assets/css/app.scss'

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.use(VueFirebase, {firebase: firebase, config: firebaseConfig});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
