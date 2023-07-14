import {CardModel} from "@/models/CardModel";

export class GameModel {
    numberPairFinded: number
    numberPlay: number
    listCard: Array<CardModel>

    constructor (listCard: Array<CardModel>, numberCardFinded: number, numberPlay: number){
        this.numberPairFinded = numberCardFinded
        this.listCard = listCard
        this.numberPlay = numberPlay
    }}