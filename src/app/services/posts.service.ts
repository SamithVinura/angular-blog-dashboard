import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Firestore, collection, addDoc,collectionData,doc,updateDoc,deleteDoc } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(  /* private storage:AngularFireStorage */ private firestore: Firestore,private toaster:ToastrService ) { }

  uploadImage(selectedImage:any,postData:any){
    const filePath = `postIMG/${Date.now()}`

   /*  this.storage.upload(filePath,selectedImage).then(()=>{
      console.log('Image add successfully')
      this.storage.ref(filePath).getDownloadURL().subscribe(url=>{
        postData.postImgPath = 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&w=1000&q=80'
      })
    }) */
    postData.postImgPath = 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&w=1000&q=80'
    const collectionIns = collection(this.firestore, 'posts');
    addDoc(collectionIns, postData)
      .then((docRef) => {
        this.toaster.success('Data Insert Successfully')
      })
      .catch((err) => {
        console.log('error');
      });

  }
}
