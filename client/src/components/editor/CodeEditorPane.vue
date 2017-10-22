<template>
  <div>
    <file-navigator></file-navigator>
    <div id="editors">
      <div id="editor-tabs">
        <editor-tab v-for="editor in editors" v-bind:editor="editor" :key="editor.path"></editor-tab>
      </div>
      <div id="editor-container">
        <editor v-for="editor in editors" v-bind:editor="editor" :key="editor.path"></editor>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from './Editor'
import EditorTab from './EditorTab'
import FileNavigator from './FileNavigator'
import { EventBus } from '../../events.js'

function saveFile (editor, editors) {
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      editor.saved = true
      editor.originalContent = editor.content
      EventBus.$emit('update-editor', editor)

      localStorage.setItem('editors', JSON.stringify(editors))
    }
  }
  xhr.open('post', 'http://localhost:1395/api/file', true)
  xhr.send(JSON.stringify(editor))
}

export default {
  name: 'CodeEditorPane',
  data () {
    return {
      editors: {}
    }
  },

  created () {
    var editors = JSON.parse(localStorage.getItem('editors'))
    this.editors = editors || {}

    EventBus.$on('open-item', (data) => {
      if (!this.editors[data.path]) {
        data.saved = true
        data.originalContent = data.content
        this.$set(this.editors, data.path, data)
      }

      for (var i in this.editors) {
        if (i === data.path) {
          this.$set(this.editors[i], 'active', true)
        } else {
          this.$set(this.editors[i], 'active', false)
        }
      }

      localStorage.setItem('editors', JSON.stringify(this.editors))
    })

    EventBus.$on('activate-item', (data) => {
      for (var i in this.editors) {
        if (i === data.path) {
          this.$set(this.editors[i], 'active', true)
        } else {
          this.$set(this.editors[i], 'active', false)
        }
      }

      localStorage.setItem('editors', JSON.stringify(this.editors))
    })

    EventBus.$on('update-editor', (data) => {
      this.$set(this.editors, data.path, data)

      localStorage.setItem('editors', JSON.stringify(this.editors))
    })

    EventBus.$on('rename-item', (data) => {
      if (this.editors[data.path]) {
        this.$set(this.editors, data.path, data)
      }

      localStorage.setItem('editors', JSON.stringify(this.editors))
    })

    EventBus.$on('close-item', (data) => {
      this.$delete(this.editors, data.path)

      var hasActive = false
      var lastKey = null

      for (var i in this.editors) {
        lastKey = i

        if (this.editors[i].active) {
          hasActive = true
        }
      }

      if (!hasActive && lastKey) {
        this.editors[lastKey].active = true
        this.$set(this.editors[lastKey], 'active', true)
        EventBus.$emit('update-editor', this.editors[lastKey])
      }

      localStorage.setItem('editors', JSON.stringify(this.editors))
    })

    window.document.addEventListener('keydown', (e) => {
      if (e.code === 'KeyS' && e.metaKey) {
        e.preventDefault()

        var editor = null

        for (var i in this.editors) {
          if (this.editors[i].active) {
            editor = this.editors[i]
            break
          }
        }

        saveFile(editor, this.editors)
      }
    }, false)
  },

  components: {
    'editor': Editor,
    'file-navigator': FileNavigator,
    'editor-tab': EditorTab
  }
}
</script>

<style scoped>
#editors{
  position: fixed;
  width: calc(79% - 70px);
  left: calc(70px + 21%);
  top: 0px;
  height: 100%;
  text-align: left;
  display: flex;
  height: 100%;
  flex-direction: column;
}

#editor-container{
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #1a2228;
}

#editor-tabs{
  display: flex;
  flex-wrap: wrap;
  background: #1a2228;
  color: rgb(147, 165, 178);
  font-size: 12px;
}
</style>
