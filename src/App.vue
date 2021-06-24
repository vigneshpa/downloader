<template lang="pug">
.bubbles
  - var n = 50;
  while n > 0
    - n--;
    .bubble
#app
  .headder I Encoder
  .content
    .orginal
      h4 Content
  .footer
    p
      | Footer here
</template>

<style lang="scss">
@import "@/assets/bubbles.scss";
$minWidth: calc(100vmin - 60px);
$width: calc(60vmin + 100px);
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .content {
    display: flex;
    flex-direction: column;
    div {
      transition: all ease 0.3s;
      margin: 1vmin auto 1vmin auto;
      background-color: rgba(236, 236, 236, 0.856);
      width: $width;
      min-width: $minWidth;
      padding: 20px;
      border-radius: 2vmin;
      box-shadow: grey 0px 0px 0.7vmin;
      video {
        width: $width;
        min-width: $minWidth;
      }
      overflow: hidden;
    }
    button {
      padding: 10px;
      margin: 10px;
      border-radius: 5px;
      border: grey solid 1px;
      background-color: white;
    }
  }
  .headder {
    font-size: 3em;
    color: white;
  }
  .footer {
    color: white;
    a {
      color: rgb(122, 122, 255);
    }
  }
}
</style>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    return {};
  },
});
</script>