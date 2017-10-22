<template>
  <div class="editor-tab" v-bind:class="setClass(editor)">
    <div class="tab-name" v-on:click="selectTab(editor)">{{editor.name}}</div>
    <div class="tab-action" v-on:click="close(editor)"></div>
  </div>
</template>

<script>
import { EventBus } from '../../events.js'

export default {
  name: 'EditorTab',
  data () {
    return {
      saved: true
    }
  },
  props: ['editor'],
  methods: {
    selectTab (editor) {
      EventBus.$emit('activate-item', editor)
    },

    setClass (editor) {
      var clss = []

      if (editor.active) {
        clss.push('active')
      }

      if (!this.saved) {
        clss.push('modified')
      }

      return clss
    },

    close (editor) {
      EventBus.$emit('close-item', editor)
    }
  },

  created () {
    EventBus.$on('update-editor', (data) => {
      if (data.path === this.editor.path) {
        this.saved = data.saved
        this.$set(this.editor, 'active', data.active)
      }
    })
  }
}
</script>

<style scoped>
.editor-tab{
  padding: 3px 7px;
  margin: 3px 6px 0px 0px;
  display: flex;
  cursor: pointer;
  flex-shrink: 3;
}

.editor-tab.active{
  background: #212a31;
}

.tab-action{
  border-radius: 50%;
  /* box-shadow: 0px 0px 0px 1px #313d46; */
  height: 12px;
  width: 12px;
  font-size: 8px;
  line-height: 8px;
  font-weight: bold;
  padding: 0px;
  margin: 0px 0px 0px 7px;
  cursor: pointer;
  overflow: hidden;
}

.tab-action:after{
  content: "x";
  font-size: 12px;
  line-height: 11px;
  position: relative;
  left: 2px;
}

.editor-tab.modified .tab-action:after{
  content: "\2022";
  font-size: 40px;
  line-height: 13px;
  position: relative;
  left: -1.5px;
  color: #a15200;
}
</style>
