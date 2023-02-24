import { Injectable } from '@angular/core';
import { Firestore,collection,addDoc } from '@angular/fire/firestore';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private firestore:Firestore) { }

  saveData(data:Category){
    const collectionIns = collection(this.firestore, 'categories')
    addDoc(collectionIns,data)
    .then((docRef)=>{console.log(docRef)})
    .catch(err=>{console.log("error")})
  }
}
