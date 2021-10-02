import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from '../model/item.model';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  menuMap=new Map();
  restaurantName: any;
  dtOptions: DataTables.Settings = {};
  selItems:Array<Item> | undefined = undefined;
  closeResult:string="";
  addItemno: any;
  addItemname: any;
  addItemPrice: any;
  editItemno: any;
  editItemname: any;
  editItemPrice: any;
  userAdmin:boolean=false;
  @ViewChild('editItemModal') editItemModal:TemplateRef<any> | undefined;
  constructor(private route: ActivatedRoute,private modalService:NgbModal) { }

  ngOnInit(): void {
    let item:Array<Item>=[];
    item.push(new Item(1,"item1",10));
    item.push(new Item(2,"item3",20));
    item.push(new Item(3,"item3",30));
    this.menuMap.set("Restaurant1",item);
    let item1:Array<Item>=[];
    item1.push(new Item(1,"2item1",10));
    item1.push(new Item(2,"2item3",20));
    item1.push(new Item(3,"2item3",30));
    this.menuMap.set("Restaurant2",item1);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      lengthMenu:[[5,10,20,25,50,-1],[5,10,20,25,50,"All"]]
    };
    if(this.route.snapshot.queryParamMap.get('restaurantName')!=null)
      this.restaurantName=this.route.snapshot.queryParamMap.get('restaurantName');
    console.log(this.restaurantName);
    if(this.menuMap.has(this.restaurantName) && this.menuMap.get(this.restaurantName)!=null) {
      this.selItems=[];
      this.selItems=this.menuMap.get(this.restaurantName);
    } else {
      this.selItems=[];
    }
  }

  open(content:any) {
    this.modalService.open(content,{ariaLabelledBy:'modal-title'}).result.then((result)=>{
      this.closeResult=`Closed with ${result}`;
    },(reason)=>{
      this.closeResult=`Dismissed ${this.getDismissReason(reason)}`;
    })
  }

  getDismissReason(reason:any):string{
    if(reason===ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if(reason===ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addItem(){
    let items:Array<any>;
    if(this.menuMap.get(this.restaurantName)!=undefined) {
      items=this.menuMap.get(this.restaurantName);
      items?.push(new Item(this.addItemno,this.addItemname,this.addItemPrice));
      this.menuMap.set(this.restaurantName,items);
      this.selItems=items;
    } else {
      let itemList:Array<any>=[];
      itemList.push(new Item(this.addItemno,this.addItemname,this.addItemPrice));
      this.menuMap.set(this.restaurantName,itemList);
      this.selItems=itemList;
    }
    this.modalService.dismissAll();
  }

  editItem(){
    let items:Array<any>;
    let newItems:Array<any>=[];
    if(this.menuMap.get(this.restaurantName)!=undefined) {
      items=this.menuMap.get(this.restaurantName);
      for(let i=0;i<items.length;i++) {
        if(this.editItemno==items[i].itemId)
          newItems.push(new Item(this.editItemno,this.editItemname,this.editItemPrice));
        else
          newItems.push(items[i]);
      }
      this.selItems=newItems;
      this.menuMap.set(this.restaurantName,newItems);
    }
    this.modalService.dismissAll();
  }

  setEditItemModal(item:Item){
    let items:Array<any>;
    if(this.menuMap.get(this.restaurantName)!=undefined) {
      items=this.menuMap.get(this.restaurantName);
      items.forEach( (value) => {
        if(item.itemId==value.itemId) {
          this.editItemno= item.itemId;
          this.editItemname=item.itemName;
          this.editItemPrice=item.itemPrice;
        }
      });
    }
    this.modalService.open(this.editItemModal,{size:'sm',backdrop:'static'});
  }

  deleteItem(item:Item) {
    let items:Array<any>;
    let newItems:Array<any>=[];
    if(this.menuMap.get(this.restaurantName)!=undefined) {
      items=this.menuMap.get(this.restaurantName);
      items.forEach( (value) => {
        if(item.itemId!=value.itemId)
          newItems.push(value);
      });
      this.selItems=newItems;
      this.menuMap.set(this.restaurantName,newItems);
    }
  }

}
