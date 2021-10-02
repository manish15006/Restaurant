export class Item{
    itemId: number;
    itemName:string;
    itemPrice:number;

    constructor(itemId:number,itemName:string,itemPrice:number) {
        this.itemId=itemId;
        this.itemName=itemName;
        this.itemPrice=itemPrice;
    }
}