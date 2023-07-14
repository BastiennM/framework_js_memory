<script setup lang="ts">
import Card from "@/components/Card.vue";
import {GameModel} from "@/models/GameModel";
import {onBeforeMount, onMounted, reactive, ref, watch} from "vue";
import {GameMethods} from "@/methods/GameMethods";
import {CardsMethod, initialCards} from "@/methods/CardsMethod";
import {CardModel} from "@/models/CardModel";

const generatedCards = CardsMethod.generatePairs(initialCards);
const shuffledCards = CardsMethod.shuffleCard(generatedCards);
const currentGame = reactive<GameModel>(GameMethods.initGame(shuffledCards));
const currentCardShowed = ref([] as CardModel[]);
const isChecking = ref(false);

watch(currentGame, (game) => {
  const cardsToCeck = getCardShowedWithoutFindedOne();

  if(cardsToCeck.length === 2) {
    isChecking.value = true;
    if (GameMethods.didCardsMatched(cardsToCeck)) {
      currentGame.numberPairFinded++;
      currentGame.listCard.forEach((card) => {
        if(card.isShowed){
          card.isFinded = true;
        }
      })
      hideAllCards();
    } else {
      hideAllCards();
    }
  }
})

function hideAllCards() {
  setTimeout(()=>{
    currentGame.listCard.forEach((card) => {
      if(!card.isFinded){
        card.isShowed = false;
      }
    })
    currentCardShowed.value.splice(0, currentCardShowed.value.length);
    isChecking.value = false; // Set isChecking to false after hiding cards
  },2000);
}

function getCardShowedWithoutFindedOne() {
  return currentGame.listCard.filter((card) => {
    return card.isShowed && !card.isFinded;
  })
}

function onCardClick(index: number) {
  currentGame.listCard[index].isShowed = !currentGame.listCard[index].isShowed
  currentGame.numberPlay++;
}
</script>

<template>
    <div class="row g-4">
      <template v-for="(card, index) in currentGame.listCard" :key="card.id">
        <div class="col-6 col-md-3 col-lg-3">
          <Card :is-checking="isChecking" @flipCard="onCardClick(index)" :card="card"/>
        </div>
      </template>
    </div>
  couycu
</template>