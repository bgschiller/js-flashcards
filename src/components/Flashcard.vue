<template>
  <VueTouch
    tag="div"
    class="flashcard"
    @click="flip"
    @tap="flip"
    @swipeleft="$emit('nextSwipe')"
    @swiperight="$emit('prevSwipe')"
  >
    <div
      :class="backsideUp ? 'flip-container flipped' : 'flip-container'"
      :style="computedHeight"
    >
      <div class="flipper">
        <Card clss="front" :style="computedHeight">
          <pre v-html="compiledFront" />
        </Card>
        <Card clss="back" :style="computedHeight">
          <pre v-html="compiledBack" />
        </Card>
      </div>
    </div>
    <GlobalEvents
      @keydown.space.prevent="flip"
    />
  </VueTouch>
</template>

<script lang="ts">
import debounce from "lodash.debounce";
import highlight from "@/highlight";
import GlobalEvents from "vue-global-events";
import Vue from "vue";
import Card from "./Card.vue";

export default Vue.extend({
  name: "Flashcard",
  props: {
    front: String,
    back: String,
  },
  components: {
    Card,
    GlobalEvents,
  },
  data() {
    return {
      backsideUp: false,
      pageWidth: window.innerWidth,
    };
  },
  computed: {
    compiledFront(): string {
      return highlight(this.front);
    },
    compiledBack(): string {
      return highlight(this.back);
    },
    height(): number {
      const lineHeight = this.pageWidth > 500 ? 21 : 16;
      const topBottomPadding = this.pageWidth > 500 ? 40 : 20;
      return (
        lineHeight *
          Math.max(
            this.front.split("\n").length,
            this.back.split("\n").length,
          ) +
        topBottomPadding
      );
    },
    computedHeight(): object {
      return { height: `${this.height}px` };
    },
  },
  methods: {
    flip() {
      this.backsideUp = !this.backsideUp;
    },
    updatePageWidth: debounce(function(this: any) {
      this.pageWidth = window.innerWidth;
    }, 30),
  },
  mounted() {
    window.addEventListener("resize", this.updatePageWidth);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updatePageWidth);
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.flashcard {
  margin: 20px auto;
  text-align: left;
  font-size: 18px;
  padding: 2px 16px;
  @media screen and (max-width: 500px) {
    font-size: 15px;
  }

  pre {
    margin: 0;
  }

  .flip-container {
    perspective: 1000px;
    margin: auto;
  }
  .flip-container.flipped .flipper {
    transform: rotateY(180deg);
  }
  .flip-container,
  .front,
  .back {
    width: 500px;
    max-width: 92vw;
  }

  /* flip speed goes here */
  .flipper {
    transition: 0.6s;
    transform-style: preserve-3d;

    position: relative;
  }

  /* hide back of pane during swap */
  .front,
  .back {
    backface-visibility: hidden;

    position: absolute;
    top: 0;
    left: 0;
  }

  /* front pane, placed above back */
  .front {
    z-index: 2;
    /* for firefox 31 */
    transform: rotateY(0deg);
  }

  /* back, initially hidden pane */
  .back {
    transform: rotateY(180deg);
  }
}
</style>
