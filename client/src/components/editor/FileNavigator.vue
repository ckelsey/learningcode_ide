<template>
  <div id="file-navigator">
    <directory-item v-for="item in directory" v-bind:item="item" :key="item.path" v-on:open-item="openItem"></directory-item>
  </div>
</template>

<script>
import DirectoryItem from './DirectoryItem'

export default {
  name: 'FileNavigator',

  data () {
    return {
      directory: {}
    }
  },

  mounted () {
    var directory = JSON.parse(localStorage.getItem('directory'))
    this.directory = directory || {}

    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        this.directory = JSON.parse(xhr.responseText)
        localStorage.setItem('directory', JSON.stringify(this.directory))
      }
    }
    xhr.open('GET', 'http://localhost:1395/api/dir', true)
    xhr.send()
  },

  methods: {
    openItem (data) {
      this.$emit('open-item', data)
    }
  },

  components: {
    'directory-item': DirectoryItem
  }
}
</script>

<style scoped>

#file-navigator{
  width: 21%;
  display: block;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 70px;
  background: #1a2227;
  text-align: left;
  color: rgb(147, 165, 178);
  font-size: 12px;
}
</style>
