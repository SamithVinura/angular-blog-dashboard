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
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PostsService {

  constructor(
    private storage:AngularFireStorage, private firestore: Firestore,
    private toaster: ToastrService,
    private router:Router
  ) {}

  uploadImage(selectedImage: any, postData: any,formStatus:any,id:any) {
    const filePath = `postIMG/${Date.now()}`;

     this.storage.upload(filePath,selectedImage).then(()=>{
      this.storage.ref(filePath).getDownloadURL().subscribe(url=>{
        postData.postImgPath = `${url}`
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

      })
    })
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
