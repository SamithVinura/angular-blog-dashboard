import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    /* private storage:AngularFireStorage */ private firestore: Firestore,
    private toaster: ToastrService,
    private router:Router
  ) {}

  uploadImage(selectedImage: any, postData: any,formStatus:any,id:any) {
    const filePath = `postIMG/${Date.now()}`;

    /*  this.storage.upload(filePath,selectedImage).then(()=>{
      console.log('Image add successfully')
      this.storage.ref(filePath).getDownloadURL().subscribe(url=>{
        postData.postImgPath = 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&w=1000&q=80'
      })
    }) */
    postData.postImgPath =
      'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&w=1000&q=80';

    if(formStatus == 'Edit'){
      const docIns = doc(this.firestore,'posts',id)
    updateDoc(docIns,postData)
    .then((docRef) => {
      this.toaster.success('Post Updated Successfully')
      this.router.navigate(['/posts'])
    })
    .catch((err) => {
      console.log('error');
    });
    }else{
      const collectionIns = collection(this.firestore, 'posts');
      addDoc(collectionIns, postData)
        .then((docRef) => {
          this.toaster.success('Post Insert Successfully');
          this.router.navigate(['/posts'])
        })
        .catch((err) => {
          console.log('error');
        });
    }

  }

  loadData(){
    const collectionIns = collection(this.firestore, 'posts');
    return collectionData(collectionIns,{idField:'id'})
  }

  deletePostData(id:any){
    const docIns = doc(this.firestore,'posts',id)
    deleteDoc(docIns)
    .then((docRef) => {
      this.toaster.success('Post Deleted Successfully')
    })
    .catch((err) => {
      console.log('error');
    });
  }

  markFeatured(id:any,featuredData:any){
    const docIns = doc(this.firestore,'posts',id)
    updateDoc(docIns,featuredData)
    .then((docRef) => {
      this.toaster.info('Featured Status Updated')
    })
    .catch((err) => {
      console.log('error');
    });
  }
}
