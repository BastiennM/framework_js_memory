import {CardModel} from "@/models/CardModel";
import {GameModel} from "@/models/GameModel";

export class GameMethods {
    static initGame (cards: Array<CardModel>) : GameModel {
        return new GameModel(cards, 0, 0);
    }

    static didCardsMatched(cards: Array<CardModel>) : boolean {
        let isMatched = false;

        // Vérifier si les cartes sont identiques
        if (cards[0].content === cards[1].content) {
            isMatched = true;
        }

        return isMatched;
    }
}