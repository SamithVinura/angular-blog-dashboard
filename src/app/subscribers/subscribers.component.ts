import { Component, OnInit } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {

  subscribers:any
  constructor(private subscribeService:SubscribersService){}

  ngOnInit():void{
    this.subscribeService.loadData().subscribe(data=>{
      this.subscribers = data
    })
  }

  onDelete(id:any){
this.subscribeService.deleteData(id)
this.subscribeService.loadData().subscribe(data=>{
  this.subscribers = data
})
  }

}
