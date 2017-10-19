<template>
  <div id="editors">
      <editor v-for="editor in editors" v-bind:editor="editor"></editor>
      <!-- <pre v-for="editor in editors"><code v-html="formatCode(editor)"></code></pre> -->
    </div>
</template>

<script>
import editor from './Editor'
// import Vue from 'vue'
// import Navigation from '@/components/Navigation'
// import Prism from 'prismjs'
// require('../../node_modules/prismjs/themes/prism.css')

export default {
  name: 'CodeEditorPane',
  data () {
    return {
      editors: [{
        name: 'afile.js',
        content: 'var data = 1; \nvar poop ="yas";'
      }]
    }
  },
  components: {
    editor
  }
}

// Vue({
//   el: '#editors',
//   data: {
//     editors: [{
//       filename: 'afile.js',
//       code: 'var data = 1;'
//     }]
//   },
//   methods: {
//     formatCode: function (editor) {
//       var code = editor.code
//       var html = Prism.highlight(code, Prism.languages.javascript)
//       return html
//     }
//   }
// })
</script>

<style scoped>
#editors{
  position: fixed;
  width: calc(100% - 70px);
  left: 70px;
  top: 0px;
  height: 100%;
  text-align: left;
}
</style>
