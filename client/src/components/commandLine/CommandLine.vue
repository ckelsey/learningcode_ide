<template>
  <div id="command-line-container">
    <div id="command-line-editor">
      <div id="command-line-output" v-html="history"></div>
      <div id="command-line-input">
        <div id="command-line-pointer">&#8594;</div>
        <input id="command-line-input-field" type="text" v-on:keydown="updateCommand($event)">
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
var socket

function goToBottom () {
  setTimeout(function (params) {
    var out = document.getElementById('command-line-output')
    out.scrollTop = out.scrollHeight
  }, 100)
}

export default {
  name: 'CommandLine',
  data () {
    return {
      history: localStorage.getItem('terminal') || ''
    }
  },

  methods: {
    runCommand (value) {
      this.history = this.history + '<br><span class="history-command"><span style="font-family: monospace; font-size: 21px; font-weight: bold; padding: 0px 3px 0px 0px; display: inline-block;">&#8594;</span>' + value + '</span>'
      localStorage.setItem('terminal', this.history)
      socket.emit('input', value)
      document.getElementById('command-line-input-field').value = ''
      goToBottom()
    },

    updateCommand (ev) {
      if (ev.code === 'Enter') {
        ev.preventDefault()

        this.runCommand(ev.target.value)
      }
    }
  },

  mounted () {
    socket = io.connect('http://localhost:1396')

    socket.on('output', (data) => {
      data = data.replace('\n', '<br>')
      data = data.replace('\r', '<br>')

      this.history = this.history + '<br>' + data
      localStorage.setItem('terminal', this.history)

      goToBottom()
    })

    goToBottom()
  }
}
</script>

<style scoped>
#command-line-container{
  background: #1a2227;
  position: fixed;
  width: calc(100% - 70px);
  left: 70px;
  top: 0px;
  height: 100%;
  text-align: left;
  display: flex;
  height: 100%;
  flex-direction: column;
}

#command-line-editor{
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#command-line-output{
  flex-grow: 1;
  max-height: calc(100% - 32px);
  overflow: auto;
  color: #708e9e;
  font-size: 12px;
  padding: 7px 21px;
  box-sizing: border-box;
  white-space: pre;
}

#command-line-input{
  position: relative;
}

input, input:focus{
  width: 100%;
  min-width: 100%;
  line-height: 18px;
  border: none;
  font-size: 12px;
  padding: 7px 21px;
  font-family: monospace;
  white-space: pre;
  background: transparent;
  caret-color: #66d9ef;
  outline: none;
  box-sizing: border-box;
  color: #7897a9;
}

#command-line-pointer{
  position: absolute;
  bottom: 5px;
  left: 5px;
  color: #c26c00;
  font-weight: bold;
  font-family: monospace;
  font-size: 21px;
}
</style>
