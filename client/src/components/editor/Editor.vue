<template>
  <div class="editor" v-bind:class="setClass()">
    <div class="line-number">
      <pre v-for="(val, index) in lineNumberArray" :key="index"><code>{{index + 1}}</code></pre>
    </div>
    <div class="editor-content">
      <div class="editor-content-inner" v-bind:style="setStyle(['height', 'width'])">
        <pre class="line-numbers" v-bind:style="setStyle(['height', 'width'])"><code v-html="html" v-bind:id="'code-' + getId(editor)"></code></pre>
        <textarea
          spellcheck="false"
          v-model="editor.content"
          v-bind:style="setStyle(['height', 'width'])"
          v-on:input="updateContent(editor)"
          v-on:keydown="shortcuts($event)"
          v-bind:id="'textarea-' + getId(editor)"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../../events.js'
import Prism from 'prismjs'
require('../../../node_modules/prismjs/themes/prism-okaidia.css')
require('../../../node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css')

export default {
  name: 'Editor',
  data () {
    return {
      html: '',
      width: 0,
      height: 18,
      minHeight: 18,
      lineNumberArray: []
    }
  },
  props: ['editor'],
  computed: {
    lineNumbers () {
      if (!this.editor || (typeof this.editor.content === 'object' && !Object.keys(this.editor.content).length)) {
        return ['']
      }

      this.lineNumberArray = this.editor.content.split('\n')

      return this.lineNumberArray
    }
  },
  methods: {
    getId () {
      return this.editor.path.split('.').join('-').split('/').join('_')
    },

    formatCode () {
      if (!this.editor.content) {
        this.html = ''
        return false
      }

      var code = this.editor.content
      var type = this.editor.ext

      switch (this.editor.ext) {
        case 'js':
          type = 'javascript'
          break
      }

      this.html = Prism.highlight(code, Prism.languages[type])

      return this.html
    },

    setWidth () {
      var id = this.getId()
      var codeEl = document.getElementById('code-' + id)

      if (codeEl) {
        this.width = codeEl.offsetWidth
      }

      return this.width
    },

    setHeight () {
      if (typeof this.editor.content === 'object' && !Object.keys(this.editor.content).length) {
        this.height = this.minHeight
        return
      }

      var lines = this.editor.content.split('\n').length
      this.height = (lines * this.minHeight)

      return this.height
    },

    setStyle (rules) {
      var style = {}

      rules.forEach((rule) => {
        style[rule] = this[rule] + 'px'
      })

      return style
    },

    setClass () {
      this.updateContent()
      return this.editor.active ? ['active'] : []
    },

    updateContent () {
      this.formatCode()
      this.setWidth()
      this.setHeight()

      this.lineNumberArray = this.lineNumbers

      if (this.editor.content !== this.editor.originalContent) {
        this.editor.saved = false
      } else {
        this.editor.saved = true
      }

      EventBus.$emit('update-editor', this.editor)
    },

    shortcuts (ev) {
      if (ev.code === 'Tab') {
        ev.preventDefault()
        document.execCommand('insertHTML', false, '&#009')
        this.updateContent()
      }
    }
  },

  mounted () {
    this.updateContent()
  }
}
</script>

<style scoped>
textarea, textarea:hover{
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    min-width: 100%;
    min-height: 100%;
    line-height: 18px;
    border: none;
    font-size: 12px;
    padding: 0px 0px 0px 0px;
    font-family: monospace;
    white-space: pre;
    opacity: 1;
    color: transparent;
    background: transparent;
    caret-color: #66d9ef;
    outline: none;
    box-sizing: border-box;
    resize: none;
    tab-size: 2;
    overflow: hidden;
}
pre{
  pointer-events: none;
  line-height: 18px;
  font-size: 12px;
  font-family: monospace;
  white-space: pre;
  margin: 0px;
  min-height: 100%;
  min-width: 100%;
  background: #202a30;
  color: #aabbc8;
  tab-size: 2;
}

pre.line-numbers{
  padding-left: 0px;
}

.line-number{
  position: absolute;
  top: 1px;
  left: 0px;
  padding: 0px;
  background: #202a30;
  color: #aabbc8;
  min-height: calc(100% - 1px);
  z-index: 1;
  min-width: 49px;
  text-align: center;
}

.line-number pre{
  margin: 0px;
}

.editor{
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 1;
  overflow: auto;
  opacity: 0;
  pointer-events: none;
}

.editor.active{
  z-index: 2;
  opacity: 1;
  pointer-events: all;
}

.editor-content{
  width: calc(100% - 50px);
  height: 100%;
  margin-left: 50px;
  position: relative;
}

.editor-content-inner{
  min-width: 100%;
  min-height: 100%;
}
</style>
