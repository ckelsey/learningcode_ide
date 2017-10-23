<template>
  <div id="viewer-container">
    <iframe
      frameborder="0"
      allowtransparency="true"
      height="100%"
      width="100%"
      allowfullscreen="true"
      scrolling="no"
      v-bind:src="getUrl()"
    ></iframe>
  </div>
</template>

<script>

export default {
  name: 'Viewer',
  data () {
    return {}
  },

  methods: {
    getUrl () {
      return this.url
    }
  },

  created () {
    this.url = 'http://localhost:1395/start/index.html'
  }
}
</script>

<style scoped>
#viewer-container{
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
</style>
