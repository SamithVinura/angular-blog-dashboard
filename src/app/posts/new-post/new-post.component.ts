import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  permalink: string = '';
  imgSrc: any = './assets/placeholder-image.png';
  selectedImg: any;
  categories!: any;
  postForm!: FormGroup;
  post: any;
  id:any
  formStatus:string='Add New'
  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((val1) => {
      /* this.findObjectById(val['id']) */
       this.id = val1['id'];
     /* this.postService.loadData().subscribe((val2) => {
        const foundObject = val2.find((post: any) => post.id === id);
        this.postForm.controls['title'].setValue(foundObject);
        console.log(foundObject)
      }); */
      /* this.postService.loadOneData(id) */

    });
    console.log(this.id)
    this.postService.loadData().subscribe((val2) => {
      const posts = val2
      const foundObject = posts.find((post: any) => post.id === this.id);
      this.post = foundObject
      console.log(this.post)
      this.postForm.controls['title'].setValue(this.post.title);
      this.postForm.controls['permalink'].setValue(this.post.permalink);
      this.postForm.controls['excerpt'].setValue(this.post.excpert);
      this.postForm.controls['category'].setValue(`${this.post.category.id}-${this.post.category.category}`);
      this.postForm.controls['postImg'].setValue(this.post.postImg);
      this.postForm.controls['content'].setValue(this.post.content);
      this.imgSrc =this.post.postImgPath
      this.formStatus ='Edit'
    });


   this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', Validators.required],
      excerpt: ['', [Validators.required, Validators.maxLength(50)]],
      category: ['', Validators.required],
      postImg: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categories = this.categoryService.loadData();
  }


  get fc() {
    return this.postForm.controls;
  }

  onTitleChange(e: any) {
    const title = e.target.value;
    this.permalink = title.replace(/\s/g, '-');
  }

  showPreview(e: any) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (event: any) => {
      this.imgSrc = event.target.result;
    };

    this.selectedImg = e.target.files[0];
  }

  onSubmit() {
    let splitted = this.postForm.value.category.split('-');
    console.log(splitted);
    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1],
      },
      postImgPath: '',
      excpert: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createAt: new Date(),
    };

    this.postService.uploadImage(this.selectedImg, postData,this.formStatus,this.id);
    console.log(postData);

    this.postForm.reset();
    this.imgSrc = './assets/placeholder-image.png';
  }
}
