import { Component, OnInit } from '@angular/core';
import { Firestore,collection,addDoc } from '@angular/fire/firestore';



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


  constructor(private firestore:Firestore){}

  ngOnInit():void{}

  onSubmit(formData:any){
    let categoryData = {
      category:formData.value
    }
    const collectionIns = collection(this.firestore, 'categories')
    addDoc(collectionIns,formData.value)
    .then((docRef)=>{console.log(docRef)})
    .catch(err=>{console.log("error")})
  }
}
