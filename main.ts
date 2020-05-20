import Vue from 'vue';

import AppComponent from './app';

console.log('Environment:', process.env.NODE_ENV);

const v = new Vue({
  el: '#app',
  components: { AppComponent },
  render: h => h(AppComponent, { key: 'app' })
});
