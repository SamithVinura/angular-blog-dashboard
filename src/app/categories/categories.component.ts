import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoriesService } from '../services/categories.service';



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

public categoryArray!:any

  constructor(private categoriesService:CategoriesService){}

  ngOnInit():void{

   this.categoryArray = this.categoriesService.loadData()
  }

  onSubmit(formData:any){
    const category:Category = formData.value
    this.categoriesService.saveData(category)
    formData.reset()
  }

}
