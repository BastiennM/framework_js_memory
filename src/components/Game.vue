<script setup lang="ts">
import Card from "@/components/Card.vue";
import {GameModel} from "@/models/GameModel";
import {onBeforeMount, onMounted, reactive, ref, watch} from "vue";
import {GameMethods} from "@/methods/GameMethods";
import {CardsMethod, initialCards} from "@/methods/CardsMethod";
import {CardModel} from "@/models/CardModel";
import Modal from "@/components/Modal.vue";

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
  if(getCardShowedWithoutFindedOne().length === 2) currentGame.numberPlay++
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
  <div class="d-flex flex-column justify-content-between h-50">
    <div>
      <div v-if="currentGame.numberPairFinded !== initialCards.length" class="alert alert-primary mt-4 " role="alert">
        Nombre de coups joués : {{ currentGame.numberPlay }}
      </div>
      <div v-if="currentGame.numberPairFinded !== initialCards.length" class="alert alert-secondary" role="alert">
        Nombre de paires trouvées : {{ currentGame.numberPairFinded }}
      </div>
      <div v-if="currentGame.numberPairFinded == initialCards.length" class="alert alert-success mt-4" role="alert">
        Bravo, vous avez trouvé toutes les paires en {{ currentGame.numberPlay }} coups !
      </div>
    </div>
    <div class="mb-5 align-content-center">
      <Modal></Modal>
    </div>
  </div>
</template>