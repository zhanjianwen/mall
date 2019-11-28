<template>
  <div class="snow"></div>
</template>
<style >
html,
body,
#app,
.snow {
  height: 100%;
}
.snow {
  background-color: black;
}
</style>
<script>
import $Snow from "./snow.js";
export default {
  data() {
    return {};
  },
  created() {
    var snow = new $Snow({
      img: true,
      imgurl: "https://hinisal.github.io/snow/imgs/snow.png",
      stay: true,
      css: {
        animation: "rotate 3s linear infinite"
      }
    });
  }
};
</script>