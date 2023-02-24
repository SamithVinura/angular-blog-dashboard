import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc,collectionData } from '@angular/fire/firestore';
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
    return collectionData(collectionIns)
  }


}
