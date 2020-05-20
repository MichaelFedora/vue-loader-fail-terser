# Vue-Loader-Fail-Terser

Using vue loader with a bad piece of code can cause it to fail terser without it giving useful information.

This:

```typescript
import Vue from 'vue';

[];

export default Vue.component('my-app', {
  data() {
    return { text: 'hello world' };
  }
});
```

Turns into this when compiled as production mode (before terser):

```javascript

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app.vue?vue&type=template&id=381730fa&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { attrs: { id: "app" } }, [_vm._v(_vm._s(_vm.text))])
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./app.vue?vue&type=template&id=381730fa&

// CONCATENATED MODULE: ./node_modules/ts-loader??ref--1!./app.ts?vue&type=script&lang=js&

[];
/* harmony default export */ var ts_loader_ref_1_appvue_type_script_lang_js_ = (vue_runtime_esm["a" /* default */].component('my-app', {
    data() {
        return { text: 'hello world' };
    }
}));
```

With this:

```javascript
render._withStripped = true


// CONCATENATED MODULE: ./app.vue?vue&type=template&id=381730fa&

// CONCATENATED MODULE: ./node_modules/ts-loader??ref--1!./app.ts?vue&type=script&lang=js&

[];
```

Being read as this:

```javascript
render._withStripped = true[];
```

Which obviously throws Terser off and is no bueno. Obviously the original code of just having a throwaway `[]`
is not recommended and is actually very bad for the above reasons. My original code had it at the end of an
interface I moved over from an in-place type, like so:

```typescript
interface Foo {
    bar: number;
    cetus: string;
    orb_vallis: boolean;
}[]; // <-- the problem
```

...with the trailing `[]` being left over after Typescript stripped away the interfaces.
