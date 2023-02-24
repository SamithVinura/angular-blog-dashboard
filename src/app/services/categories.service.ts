import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc,collectionData,doc,updateDoc,deleteDoc } from '@angular/fire/firestore';
import { Category } from '../models/category';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private firestore: Firestore,private toaster:ToastrService) {}

  saveData(data: Category) {
    const collectionIns = collection(this.firestore, 'categories');
    addDoc(collectionIns, data)
      .then((docRef) => {
        this.toaster.success('Data Insert Successfully')
      })
      .catch((err) => {
        console.log('error');
      });
  }

  loadData(){
    const collectionIns = collection(this.firestore, 'categories');
    return collectionData(collectionIns,{idField:'id'})
  }

  updateData(id:string,updateData:any){
    const docIns = doc(this.firestore,'categories',id)
    updateDoc(docIns,updateData)
    .then((docRef) => {
      this.toaster.success('Data Edited Successfully')
    })
    .catch((err) => {
      console.log('error');
    });

  }

  deleteData(id:string){
    const docIns = doc(this.firestore,'categories',id)
    deleteDoc(docIns)
    .then((docRef) => {
      this.toaster.success('Data Deleted Successfully')
    })
    .catch((err) => {
      console.log('error');
    });
  }


}
