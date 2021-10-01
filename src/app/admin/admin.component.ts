import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  template: `
  <div  class="p-3 mb-2 bg-dark text-white">
    <div class="d-flex flex-row justify-content-center"><h2>Admin Module</h2></div>
    <div class="d-flex flex-row justify-content-center"><h3>Dashboard</h3></div>
    <div class="d-flex flex-row justify-content-center">
      <button type="button" class="btn btn-primary" style="margin-right:10px;">Menu</button>
      <button type="button" class="btn btn-warning">Restaurant</button>
    </div>
  </div>
  ` ,
  styles: []
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
