import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoriesService } from '../services/categories.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  public categoryArray!: any;
  public formCategory!: any;
  public categoryId!: string;
  public formStatus: string = 'Add';
  constructor(
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.categoryArray = this.categoriesService.loadData();
  }

  onSubmit(formData: any) {
    if (this.formStatus === 'Add') {
      const category: Category = formData.value;
      this.categoriesService.saveData(category);
      formData.reset();
    } else if ((this.formStatus = 'Edit')) {
      this.categoriesService.updateData(this.categoryId,formData.value)

    }
  }

  onEdit(id: string, category: any) {
    this.formCategory = category;
    this.categoryId = id;
    this.formStatus = 'Edit';
  }
}
