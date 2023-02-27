import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  permalink:string=''
  constructor(){}

  ngOnInit():void{}

  onTitleChange(e:any){

    const title = e.target.value
    this.permalink = title.replace(/\s/g,'-')

  }

}
