import { Injectable } from '@angular/core';
import { Firestore,collection,addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private firestore:Firestore) { }

  saveData(data:any){
    const collectionIns = collection(this.firestore, 'categories')
    addDoc(collectionIns,data.value)
    .then((docRef)=>{console.log(docRef)})
    .catch(err=>{console.log("error")})
  }
}
