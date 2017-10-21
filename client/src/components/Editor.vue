<template>
  <div class="editor" v-bind:class="setClass(editor)">
    <div class="line-number">
      <pre v-for="(val, index) in lineNumbers(editor)" :key="index"><code>{{index + 1}}</code></pre>
    </div>
    <pre class="line-numbers" v-bind:style="editorHeight(editor)"><code v-html="html"></code></pre>
    <textarea spellcheck="false" v-model="editor.content" v-bind:style="editorHeight(editor)" v-on:input="updateContent(editor)" v-on:keydown="shortcuts($event)"></textarea>
  </div>
</template>

<script>
import { EventBus } from '../events.js'
import Prism from 'prismjs'
require('../../node_modules/prismjs/themes/prism-okaidia.css')
require('../../node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css')

export default {
  name: 'Editor',
  data () {
    return {
      html: ''
    }
  },
  props: ['editor'],
  methods: {
    formatCode (editor) {
      if (typeof editor.content === 'object' && !Object.keys(editor.content).length) {
        this.html = ''
        return false
      }

      var code = editor.content
      var type = 'javascript'

      switch (editor.ext) {
        case 'html':
          type = editor.ext
          break
      }

      this.html = Prism.highlight(code, Prism.languages[type])
    },

    editorHeight (editor) {
      if (typeof editor.content === 'object' && !Object.keys(editor.content).length) {
        return '18px'
      }

      var lines = editor.content.split('\n').length

      return {
        height: (lines * 18) + 'px'
      }
    },

    lineNumbers (editor) {
      if (typeof editor.content === 'object' && !Object.keys(editor.content).length) {
        return ['']
      }

      return editor.content.split('\n')
    },

    setClass (editor) {
      return editor.active ? ['active'] : []
    },

    updateContent (editor) {
      this.formatCode(editor)

      if (editor.content !== editor.originalContent) {
        editor.saved = false
      }

      EventBus.$emit('update-editor', editor)
    },

    shortcuts (ev) {
      if (ev.code === 'Tab') {
        ev.preventDefault()
        document.execCommand('insertHTML', false, '&#009')

        // let selection = window.getSelection()
        // let range = selection.getRangeAt(0)
        // range.deleteContents()
        // let node = document.createTextNode('\u00a0\u00a0\u00a0\u00a0')
        // range.insertNode(node)
        // range.setStartAfter(node)
        // range.setEndAfter(node)
        // selection.removeAllRanges()
        // selection.addRange(range)
      }
    }
  },

  created () {
    this.formatCode(this.editor)
  }
}
</script>

<style scoped>
textarea, textarea:hover{
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    border: none;
    font-size: 13px;
    padding: 0px 0px 0px 30px;
    font-family: monospace;
    white-space: pre;
    opacity: 1;
    color: transparent;
    background: transparent;
    caret-color: #66d9ef;
    outline: none;
    line-height: 18px;
    min-height: 100%;
    box-sizing: border-box;
    resize: none;
    tab-size: 2;
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
  tab-size: 2;
}

pre.line-numbers{
  padding-left: 30px;
}

.line-number{
    position: absolute;
    top: 1px;
    left: 0px;
    padding: 0px 7px;
    background: #202a30;
    color: #aabbc8;
    min-height: calc(100% - 1px);
    z-index: 1;
}

.line-number pre{
  margin: 0px;
}

.editor{
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 1;
}

.editor.active{
  z-index: 2;
}
</style>
