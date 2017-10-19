<template>
  <div class="editor">
    <div class="line-number">
      <pre v-for="(val, index) in lineNumbers(editor)"><code>{{index}}</code></pre>
    </div>
    <pre class="line-numbers" v-bind:style="editorHeight(editor)"><code v-html="formatCode(editor)"></code></pre>
    <textarea v-model="editor.content" v-bind:style="editorHeight(editor)"></textarea>
  </div>
</template>

<script>
import Prism from 'prismjs'
require('../../node_modules/prismjs/themes/prism-okaidia.css')
require('../../node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css')

export default {
  name: 'Editor',
  data () {
    return {}
  },
  props: ['editor'],
  methods: {
    formatCode: (editor) => {
      var code = editor.content
      var html = Prism.highlight(code, Prism.languages.javascript)
      return html
    },
    editorHeight: (editor) => {
      var lines = editor.content.split('\n').length

      return {
        height: (lines * 18) + 'px'
      }
    },
    lineNumbers: (editor) => {
      return editor.content.split('\n')
    }
  }
}
</script>

<style scoped>
div{
  position: relative;
}
textarea, textarea:hover{
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    border: none;
    font-size: 13px;
    padding: 0px 0px 0px 2em;
    font-family: monospace;
    white-space: pre;
    opacity: 1;
    color: transparent;
    background: transparent;
    caret-color: #66d9ef;
    outline: none;
    line-height: 18px;
    min-height: 100%;
}
pre{
  pointer-events: none;
  line-height: 18px;
  font-size: 13px;
  font-family: monospace;
  white-space: pre;
  margin: 0px;
  min-height: 100%;
  background: #202a30;
  color: #aabbc8;
}

pre.line-numbers{
  padding-left: 2em;
}

.line-number{
    position: absolute;
    top: 1px;
    left: 0px;
    padding: 0px 7px;
    background: #202a30;
    color: #aabbc8;
    min-height: 100%;
    z-index: 1;
}

.line-number pre{
  margin: 0px;
}

.editor{
  height: 100%;
}
</style>
