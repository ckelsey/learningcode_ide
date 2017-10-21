<template>
  <div v-bind:class="setClass(item)" v-on:contextmenu="onContextMenu($event)">
    <div v-on:click="open(item)" class="item-label" v-bind:id="setId(item)">{{item.name}}</div>
    <directory-item v-for="_item in item.children" v-bind:item="_item" :key="_item.path"></directory-item>

    <div class="context-menu">
      <div v-on:click="newFile(item)" class="context-folder-only">New file</div>
      <div v-on:click="newFolder(item)" class="context-folder-only">New folder</div>
      <div v-on:click="rename(item)">Rename</div>
      <div v-on:click="deleteItem(item)">Delete</div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../events.js'

export default {
  name: 'DirectoryItem',

  data () {
    return {}
  },

  props: ['item'],

  methods: {
    setClass (item) {
      if (item.ext) {
        return ['file-navigator-item', 'file', 'file-' + item.ext]
      }

      return ['file-navigator-item', 'directory', 'directory-open-' + item.dirOpen]
    },

    setId (item) {
      return item.path.split('.').join('-').split('/').join('_')
    },

    open (item, newFile) {
      if (!item.ext) {
        item.dirOpen = !item.dirOpen
      }

      if (newFile && !item.ext) {
        item.dirOpen = true
      }

      var id = item.path.split('.').join('-').split('/').join('_')
      var el = document.getElementById(id)

      if (el && !el.getAttribute('contenteditable')) {
        let xhr = new XMLHttpRequest()

        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText)
            item.content = data

            if (!item.ext) {
              item.children = data

              if (newFile) {
                item.children[newFile.path] = newFile
              }
            } else {
              item.content = data
              EventBus.$emit('open-item', item)
            }
          }
        }

        xhr.open('GET', 'http://localhost:1395/api/' + (item.ext ? 'file' : 'dir') + '?path=' + item.path, true)
        xhr.send()
      }
    },

    onContextMenu (ev) {
      ev.preventDefault()
      ev.target.parentElement.classList.add('context')

      function hideContext () {
        ev.target.parentElement.classList.remove('context')
        ev.target.parentElement.removeEventListener('mouseleave', hideContext, false)
        ev.target.parentElement.removeEventListener('click', hideContext, false)
      }

      ev.target.parentElement.addEventListener('mouseleave', hideContext, false)
      ev.target.parentElement.addEventListener('click', hideContext, false)
    },

    rename (item) {
      return new Promise((resolve, reject) => {
        var id = item.path.split('.').join('-').split('/').join('_')
        var el = document.getElementById(id)

        el.setAttribute('contenteditable', true)
        el.focus()

        function removeEditable () {
          el.setAttribute('contenteditable', false)

          el.removeEventListener('blur', removeEditable, false)

          var oldPath = item.path
          var path = oldPath.split('/')
          path.pop()
          item.path = path.join('/') + '/' + el.textContent
          item.name = el.textContent
          item.oldPath = oldPath

          let xhr = new XMLHttpRequest()

          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
              var parentPath = item.path.split('/')
              parentPath.pop()

              EventBus.$emit('update-directory', parentPath.join('/'))

              return resolve(item)
            }
          }

          xhr.open('POST', 'http://localhost:1395/api/rename', true)
          xhr.send(JSON.stringify(item))

          EventBus.$emit('rename-item', item)
        }

        function keyDown (e) {
          if (e.code === 'Enter') {
            e.preventDefault()
            removeEditable()
          } else if (e.code === 'Escape') {
            e.preventDefault()
            el.removeEventListener('blur', removeEditable, false)
            el.setAttribute('contenteditable', false)
            el.textContent = item.name
            return resolve(item)
          }
        }

        el.addEventListener('blur', removeEditable, false)
        el.addEventListener('keydown', keyDown, false)
      })
    },

    newFile (item) {
      this.open(item, {
        ext: 'file',
        path: item.path + '/' + 'file.file',
        name: 'new_file.txt'
      })
    },

    newFolder (item) {
      this.open(item, {
        path: item.path + '/' + 'folder',
        name: 'new_folder'
      })
    },

    deleteItem (item) {
      let xhr = new XMLHttpRequest()

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var parentPath = item.path.split('/')
          parentPath.pop()

          EventBus.$emit('update-directory', parentPath.join('/'))
        }
      }

      xhr.open('POST', 'http://localhost:1395/api/delete', true)
      xhr.send(JSON.stringify(item))
    }
  },

  created () {
    if (!this.item.ext) {
      this.item.dirOpen = false
    }

    EventBus.$on('update-directory', (path) => {
      if (this.item.path === path) {
        let xhr = new XMLHttpRequest()

        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText)
            this.$set(this.item, 'children', data)
          }
        }

        xhr.open('GET', 'http://localhost:1395/api/dir?path=' + this.item.path, true)
        xhr.send()
      }
    })
  },

  mounted () {
    if ((this.item.ext === 'file' && this.item.name === 'new_file.txt') || (!this.item.ext && this.item.name === 'new_folder')) {
      this.rename(this.item)
    }
  }
}
</script>

<style scoped>
.context-menu{
  position: absolute;
  top: 0px;
  width: 70%;
  background: rgb(186, 200, 211);
  border-radius: 1px;
  left: 15%;
  display: none;
  z-index: 10;
  color: #1a2228;
}

.context-menu > div{
  padding: 3px 7px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  transition: all .2s;
}

.context-menu > div:hover{
  background: rgb(22, 58, 79);
  color: #fff;
}

.context > .context-menu{
  display: block;
}

.item-label {
  padding: 3px 0px 3px 14px;
  position: relative;
  border-bottom: 1px solid #161d22;
  user-select: none;
}

.item-label:focus {
  outline: none;
}

.item-label:hover{
  background: #1c272e;
}

.item-label[contenteditable="true"]{
  background: #293642;
}

.directory, .file {
  padding: 0px 0px 0px 7px;
  cursor: pointer;
  position: relative;
}

.file .context-folder-only{
  display: none;
}

.file .item-label:before{
  content: "*";
  font-size: 20px;
  color: #798f96;
  display: inline-block;
  position: absolute;
  top: 3px;
  left: 2px;
}

.file-html .item-label:before{
  content: "</>";
  font-size: 7px;
  color: #c26c00;
  display: inline-block;
  position: absolute;
  top: 6px;
  left: 0px;
}

.file-js .item-label:before{
  content: "js";
  font-size: 10px;
  color: #0094c2;
  display: inline-block;
  position: absolute;
}

.file-css .item-label:before{
  content: "#";
  font-size: 11px;
  color: #bec200;
  display: inline-block;
  position: absolute;
  top: 4px;
}

.file-json .item-label:before{
  content: "{}";
  font-size: 10px;
  color: #0094c2;
  display: inline-block;
  position: absolute;
}

.directory > .item-label:before{
  content: "";
  border: 5px solid transparent;
  border-left-color: #1e4f6b;
  width: 0px;
  height: 0px;
  display: inline-block;
  position: absolute;
  top: 5px;
  left: 2px;
}

.directory.directory-open-true > .item-label:before{
  content: "";
  border: 5px solid transparent;
  border-top-color: #1e4f6b;
  top: 7px;
  left: 0px;
}

.directory.directory-open-false > .directory, .directory.directory-open-false > .file{
  display: none;
}
</style>
