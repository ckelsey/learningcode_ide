<template>
  <div id="navigation">
    <div v-bind:class="{active:$route.path === '/cli'}" v-on:click="updateRoute('/cli')">
      <div><svg width="100%" height="100%" viewBox="0 7 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fstroke-linejoin:round;stroke-miterlimit:1.41421;"><path d="M44.98,58.658c1.427,-1.427 1.427,-3.743 0,-5.17l-32.321,-32.321c-1.427,-1.427 -3.744,-1.427 -5.17,0l-5.17,5.17c-1.427,1.426 -1.427,3.743 0,5.17l32.321,32.321c1.427,1.426 3.743,1.426 5.17,0l5.17,-5.17Z"/><path d="M99.389,81.153c0,-2.017 -1.638,-3.655 -3.656,-3.655l-45.709,0c-2.018,0 -3.656,1.638 -3.656,3.655l0,7.312c0,2.017 1.638,3.655 3.656,3.655l45.709,0c2.018,0 3.656,-1.638 3.656,-3.655l0,-7.312Z"/><path d="M39.773,48.287c-1.426,-1.426 -3.743,-1.426 -5.169,0l-32.322,32.322c-1.426,1.426 -1.426,3.743 0,5.169l5.17,5.17c1.427,1.427 3.743,1.427 5.17,0l32.321,-32.321c1.427,-1.427 1.427,-3.743 0,-5.17l-5.17,-5.17Z"/></svg></div>
      <div>CLI</div>
    </div>
    <div v-bind:class="{active:$route.path === '/edit'}" v-on:click="updateRoute('/edit')">
      <div><svg width="100%" height="100%" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><path d="M98.02,52.192c1.138,-1.138 1.138,-2.987 0,-4.125l-25.787,-25.787c-1.139,-1.139 -2.987,-1.139 -4.125,0l-4.125,4.124c-1.138,1.139 -1.138,2.987 0,4.125l25.788,25.788c1.138,1.138 2.986,1.138 4.124,0l4.125,-4.125Z"/><path d="M58.227,8.451c-1.032,-0.261 -2.081,0.366 -2.342,1.397l-19.51,77.256c-0.261,1.032 0.365,2.082 1.397,2.342l3.74,0.945c1.032,0.26 2.081,-0.366 2.342,-1.398l19.51,-77.256c0.261,-1.032 -0.366,-2.081 -1.397,-2.342l-3.74,-0.944Z"/><path d="M93.866,43.918c-1.138,-1.139 -2.986,-1.139 -4.125,0l-25.787,25.787c-1.138,1.138 -1.138,2.987 0,4.125l4.125,4.125c1.138,1.138 2.986,1.138 4.124,0l25.788,-25.788c1.138,-1.138 1.138,-2.986 0,-4.125l-4.125,-4.124Z"/><path d="M1.612,48.124c-1.138,1.138 -1.138,2.986 0,4.124l25.788,25.788c1.138,1.138 2.986,1.138 4.125,0l4.124,-4.125c1.139,-1.138 1.139,-2.986 0,-4.125l-25.787,-25.787c-1.138,-1.138 -2.987,-1.138 -4.125,0l-4.125,4.125Z"/><path d="M5.766,56.398c1.139,1.138 2.987,1.138 4.125,0l25.788,-25.788c1.138,-1.138 1.138,-2.986 0,-4.124l-4.125,-4.125c-1.138,-1.138 -2.987,-1.138 -4.125,0l-25.787,25.787c-1.139,1.139 -1.139,2.987 0,4.125l4.124,4.125Z"/></svg></div>
      <div>Edit</div>
    </div>
    <div v-bind:class="{active:$route.path === '/viewer'}" v-on:click="updateRoute('/viewer')">
      <div><svg width="100%" height="100%" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><g id="Layer-36"><path d="M140.085,101.91c-0.011,-22.366 -17.678,-40.425 -39.561,-40.438c-22.057,-0.013 -39.721,17.995 -39.718,40.491c0.004,22.45 17.732,40.48 39.779,40.458c21.855,-0.023 39.511,-18.13 39.5,-40.511m-139.639,0.483l0,-0.893c9.642,-9.595 19.397,-19.068 29.942,-27.689c12.209,-9.98 25.188,-18.663 40.134,-24.084c6.949,-2.521 14.149,-3.918 21.442,-4.923l16.964,0c0.359,0.088 0.713,0.222 1.077,0.258c12.892,1.293 24.933,5.32 36.351,11.328c15.828,8.328 29.289,19.717 41.705,32.428c4.203,4.303 8.261,8.748 12.385,13.128l0,0.893c-9.22,9.285 -18.508,18.496 -28.636,26.812c-12.842,10.544 -26.638,19.443 -42.48,24.869c-6.78,2.323 -13.774,3.614 -20.848,4.569l-16.964,0c-6.416,-0.773 -12.777,-1.821 -18.982,-3.685c-17.401,-5.226 -31.904,-15.275 -45.325,-27.149c-9.301,-8.23 -17.906,-17.177 -26.765,-25.862" style="fill-rule:nonzero;"/><path d="M100.773,126.045c-13.075,-0.005 -23.466,-10.442 -23.974,-23.748c-0.459,-12.026 9.146,-23.023 21.151,-24.196c1.18,-0.116 2.377,-0.263 3.551,-0.179c2.373,0.169 2.458,0.4 1.286,2.431c-3.564,6.18 -2.394,13.396 2.916,17.992c4.251,3.679 10.424,4.333 15.652,1.657c2.366,-1.21 2.755,-1.037 2.73,1.63c-0.138,14.67 -11.197,23.34 -21.201,24.175c-0.815,0.068 -1.625,0.183 -2.111,0.238" style="fill-rule:nonzero;"/></g></svg></div>
      <div>View</div>
    </div>
    <div v-bind:class="{active:helpOpen}" v-on:click="helpOpen = !helpOpen">
      <div style="margin-bottom: 7px;"><svg width="100%" height="100%" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><g id="Layer-31"><path d="M97.863,43.311c-12.746,0.303 -22.153,-9.711 -22.153,-21.85c0,-10.014 10.318,-20.028 23.671,-20.028c14.869,0 22.456,10.317 22.456,19.118c0,10.014 -6.98,22.153 -23.974,22.76m41.575,155.678c-2.428,0 -16.388,-0.91 -42.789,-0.91c-17.601,0 -29.436,0.91 -32.774,0.91c-1.518,0 -2.428,-0.606 -2.428,-3.034l0,-6.069c0,-1.822 0.91,-2.428 3.034,-2.428l11.229,0c3.338,0 5.462,-1.214 5.765,-6.069c0.608,-9.105 0.608,-18.512 0.608,-27.009l-0.608,-42.486c0,-8.497 -1.82,-14.566 -14.566,-19.118c-3.338,-1.214 -3.642,-2.427 -3.642,-4.249l0,-3.338c0,-0.91 0.608,-1.517 3.339,-2.427l45.216,-14.567c3.338,-1.214 6.069,-1.821 8.193,-1.821c2.428,0 3.339,1.518 3.035,3.642c-0.607,5.159 -0.607,24.277 -0.607,50.982l0,32.472c0,11.835 0,22.759 0.304,26.097c0.607,5.767 2.124,7.891 5.463,7.891l10.924,0c2.428,0 3.035,0.91 3.035,2.731l0,5.766c0,2.124 -0.607,3.034 -2.731,3.034" style="fill-rule:nonzero;"/></g></svg></div>
      <div>Info</div>
    </div>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'Navigation',
  data: function () {
    return {
      helpOpen: false
    }
  },
  methods: {
    updateRoute: (path) => {
      router.push(path)
    }
  }
}
</script>

<style scoped>
  #navigation{
    background: #16394e;
    color: #7897a9;
    display: flex;
    position: fixed;
    height: 100%;
    top: 0px;
    left: 0px;
    width: 70px;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  #navigation > div{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 100%;
    transition: all .2s;
    font-size: 14px;
    text-transform: capitalize;
  }

  #navigation > div > div{
    text-transform: Uppercase;
  }

  #navigation > div:hover{
    background: #1f516e;
    color: #9fc0d3;
    transform: scale(1.05);
  }

  #navigation > div.active{
    background: #c36c00;
    color: #fff;
  }

  #navigation > div svg{
    fill: currentColor;
    color: #7897a9;
    width: 70%;
  }

  #navigation > div.active svg{
    color: #fff;
  }
</style>
