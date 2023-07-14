import {CardModel} from "@/models/CardModel";

export class CardsMethod {
    static generatePairs (cards: Array<CardModel>) : Array<CardModel> {
        const attributionCards : Array<CardModel> = [];
        const totalPairs = cards.length;

        // Ajouter les paires de cartes au tableau attributionCards
        for (let i = 0; i < totalPairs; i++) {
            const card : CardModel = cards[i];
            attributionCards.push(new CardModel(i * 2, card.content, card.isShowed, card.isFinded));
            attributionCards.push(new CardModel(i * 2 + 1, card.content, card.isShowed, card.isFinded));
        }

        return attributionCards;
    }

    static shuffleCard (cards: Array<CardModel>) : Array<CardModel> {
        const attributionCards : Array<CardModel> = cards;

        // Mélanger le tableau attributionCards
        for (let i = attributionCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [attributionCards[i], attributionCards[j]] = [attributionCards[j], attributionCards[i]];
        }

        return attributionCards;
    }
}

export const initialCards : Array<CardModel> = [
    new CardModel(0, "src/assets/balls1.jpg", false, false),
    new CardModel(1, "src/assets/balls2.jpg", false ,false),
    new CardModel(2, "src/assets/balls3.jpg", false,false),
    new CardModel(3, "src/assets/balls4.jpg", false,false)
];
