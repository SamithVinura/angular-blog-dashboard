import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {

  postsArray:any
  constructor(private postService:PostsService){}

  ngOnInit():void{
    this.postService.loadData().subscribe(val=>this.postsArray=val)

  }

  onDelete(id:any){
    this.postService.deletePostData(id)
    this.postService.loadData().subscribe(val=>this.postsArray=val)
  }
}
