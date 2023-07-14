export class CardModel {
    index: Number
    isFinded: Boolean = false
    isShowed: Boolean = false
    content: any
    constructor (index: Number, content: any, isShowed: Boolean = false, isFinded: Boolean){
        this.content = content
        this.index = index
        this.isShowed = isShowed
        this.isFinded = isFinded
    }}