<template>
  <button :disabled="card.isFinded || card.isShowed || isChecking" @click="onCardClick()" class="w-100 card dynamicHeight">
    <div class="card-body">
      <img v-if="card.isShowed" class="dynamicBallsHeight mx-auto" :src="card.content">
      <img v-if="!card.isShowed" class="dynamicBallsHeight mx-auto" src="src/assets/Pokemon-Logo.png">
    </div>
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import {CardModel} from "@/models/CardModel";

    const props = defineProps({
        card: CardModel,
        isChecking: Boolean
    })

  const emit = defineEmits(['flipCard'])

function onCardClick() {
  if (props.card) {
    emit('flipCard')
  }
}
</script>

<style scoped>
@media (min-width: 1024px) {
  .dynamicHeight {
    height: 25vh;
  }

  .dynamicBallsHeight {
    height: 16vh;
  }
}

@media (max-width: 1024px) {
  .dynamicHeight {
    height: 15vh;
  }

  .dynamicBallsHeight {
    height: 8vh;
  }
}
</style>