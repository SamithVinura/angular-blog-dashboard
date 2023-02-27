import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  permalink:string=''
  imgSrc:any='./assets/placeholder-image.png'
  selectedImg:any
  constructor(){}

  ngOnInit():void{}

  onTitleChange(e:any){

    const title = e.target.value
    this.permalink = title.replace(/\s/g,'-')

  }

  showPreview(e:any){
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload=(event:any)=>{
      this.imgSrc = event.target.result
    }

    this.selectedImg = e.target.files[0]
  }

}
