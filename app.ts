import Vue from 'vue';

interface Foo {
  bar: number;
}[]

export default Vue.component('my-app', {
  data() {
    return { text: 'hello world' };
  }
});
