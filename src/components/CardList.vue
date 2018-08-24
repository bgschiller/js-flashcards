<template>
  <div class="cards-list">
    <transition :name="direction" mode="out-in">
      <Flashcard
        :key="currentCard.id"
        v-bind="currentCard"
        @prevSwipe="prev"
        @nextSwipe="next"
      />
    </transition>
    <GlobalEvents
      @keydown.right="next"
      @keydown.left="prev"
    />
  </div>
</template>

<script lang="ts">
import GlobalEvents from "vue-global-events";
import cards from "@/cards";
import Flashcard from "./Flashcard.vue";

import Vue from "vue";
export default Vue.extend({
  name: "CardList",
  data() {
    return {
      cards,
      currentCardIx: 0,
      direction: "left",
    };
  },
  components: {
    Flashcard,
    GlobalEvents,
  },
  computed: {
    currentCard(): object {
      return this.cards[this.currentCardIx];
    },
  },
  methods: {
    next() {
      this.direction = "slide-left";
      this.currentCardIx = (this.currentCardIx + 1) % this.cards.length;
    },
    prev() {
      this.direction = "slide-right";
      this.currentCardIx =
        this.currentCardIx === 0
          ? this.cards.length - 1
          : this.currentCardIx - 1;
    },
  },
});
</script>

<style lang="scss">
@keyframes slide-in-from-left {
  from {
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes slide-out-to-right {
  from {
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(100%, 0, 0);
  }
}
.slide-right-enter-active {
  animation: slide-in-from-left 0.3s;
}
.slide-right-leave-active {
  animation: slide-out-to-right 0.3s;
}

@keyframes slide-in-from-right {
  from {
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes slide-out-to-left {
  from {
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(-100%, 0, 0);
  }
}

.slide-left-enter-active {
  animation: slide-in-from-right 0.3s;
}
.slide-left-leave-active {
  animation: slide-out-to-left 0.3s;
}
</style>
