import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc,collectionData,doc,updateDoc,deleteDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private firestore: Firestore,private toaster:ToastrService) { }

  loadData(){
    const collectionIns = collection(this.firestore, 'subscribers');
    return collectionData(collectionIns,{idField:'id'})
  }

  deleteData(id:string){
    const docIns = doc(this.firestore,'subscribers',id)
    deleteDoc(docIns)
    .then((docRef) => {
      this.toaster.success('Data Deleted Successfully')
    })
    .catch((err) => {
      console.log('error');
    });
  }
}
