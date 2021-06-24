<template lang="pug">
.bubbles
  - var n = 50;
  while n > 0
    - n--;
    .bubble
#app
  .headder Downloader
  .content
    .geturl
      h4 Video url
      input(type="url", v-model="url", placeholder="Video URL")
      iframe#ytplayer(
        type="text/html",
        v-if="videoUrl",
        :src="videoUrl",
        frameborder="0"
      )
    .options
      h4 Download options
      h2 info
      | {{ videoInfo }}
    .output
      video.videojs(ref="videoPlayer", controls, vjs-default-skin, width="500")
  .footer
    p
      | Built with
      |
      a(href="https://www.npmjs.com/package/ytdl-core", target="_blank") ytdl-core
</template>

<style lang="scss">
@import "@/assets/bubbles.scss";
$minWidth: calc(100vmin - 60px);
$width: calc(60vmin + 100px);
$videoHeight: calc(50vmin - 30px);
input[type="text"] {
  font: 15px/24px "Lato", Arial, sans-serif;
  color: #333;
  width: 100%;
  box-sizing: border-box;
  letter-spacing: 1px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  :focus {
    outline: none;
  }
  .content {
    display: flex;
    flex-direction: column;
    .geturl,
    .output,
    .options {
      transition: all ease 0.3s;
      margin: 1vmin auto 1vmin auto;
      background-color: rgba(236, 236, 236, 0.856);
      width: $width;
      min-width: $minWidth;
      padding: 20px;
      border-radius: 2vmin;
      box-shadow: grey 0px 0px 0.7vmin;
      overflow: hidden;
      video,
      iframe {
        width: $width;
        min-width: $minWidth;
        height: $videoHeight;
      }
      input {
        width: 100%;
        box-sizing: border-box;
        padding: 5px;
        outline: none;
        border: none;
        :focus {
          border: solid 2px black;
        }
      }
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
import { computed, defineComponent, Ref, ref } from "vue";
import videojs, { VideoJsPlayer } from "video.js";
import "video.js/dist/video-js.css";
import ytdl from "ytdl-core";

export default defineComponent({
  name: "App",
  setup() {
    const url = ref("");
    let player = ref(null as unknown as Ref<VideoJsPlayer>);

    const parseVideoId = (url:string) => {
      let regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      let match = url.match(regExp);
      return match && match[7].length == 11 ? match[7] : "";
    };

    const videoUrl = computed(()=>{
      if(!url)return "";
      const videoId = parseVideoId(url.value);
      if(!videoId) return "";
      return `https://www.youtube.com/embed/${videoId}?origin=http://localhost`;
    });

    // const strm = computed(() => {
    //   return ytdl(url.value);
    // });

    const videoInfo = computed(async () => {
      if(!videoUrl.value)return "Select a video";
      const ret = await ytdl.getInfo(videoUrl.value);
      console.log(ret);
      alert(ret);
      return ret;
    });

    return { url, player, videoUrl, videoInfo };
  },
  // mounted() {
  //       this.player = videojs(this.$refs.videoPlayer as string, {
  //         techOrder:["youtube"],
  //         sources:[
  //           {type:"video/mp4", src:this.url}
  //         ]
  //       }, function onPlayerReady() {
  //           console.log('onPlayerReady');
  //       })
  //   },
  //   beforeDestroy() {
  //       if (this.player) {
  //           this.player.dispose()
  //       }
  //   }
});
</script>