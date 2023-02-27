import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  permalink:string=''
  imgSrc:any='./assets/placeholder-image.png'
  selectedImg:any
  categories!:any
  constructor(private categoryService:CategoriesService){}

  ngOnInit():void{
   this.categories = this.categoryService.loadData()
   console.log(this.categories)
  }

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
