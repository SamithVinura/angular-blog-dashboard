import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
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
  postForm!:FormGroup
  constructor(private categoryService:CategoriesService,private fb:FormBuilder){

    this.postForm = this.fb.group({
      title:['',[Validators.required,Validators.minLength(10)]],
      permalink:['',Validators.required],
      excerpt:['',[Validators.required,Validators.maxLength(50)]],
      category:[''],
      postImg:['',Validators.required],
      content:['',Validators.required]
    })
  }

  ngOnInit():void{
   this.categories = this.categoryService.loadData()

  }

  get fc(){
    return this.postForm.controls
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

  onSubmit(){
    console.log(this.postForm.value)
     const postData:Post={
      title:this.postForm.value.title,
      permalink:this.permalink,
      category:{
        categoryId:'',
        category:''
      },
      postImgPath:'',
      excpert:this.postForm.value.excerpt,
      content:this.postForm.value.content,
      isFeatured:false,
      views:0,
      status:'new',
      createAt:new Date()
    }
  }

}
