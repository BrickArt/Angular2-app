import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../../shared/servises/categories.service';
import { Category } from '../../shared/models/category.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'tim-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.sass']
})
export class AddCategoryComponent implements OnInit, OnDestroy {

  sub1: Subscription;

  @Output() onCategoryAdd = new EventEmitter<Category>()

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    let { name, capacity } = form.value;
    if (capacity < 0) capacity *= -1;

    const category = new Category(name, capacity)

    this.sub1 = this.categoriesService.addCategory(category)
      .subscribe((category: Category) => {
        form.reset();
        form.form.patchValue({ capacity: 1 });
        this.onCategoryAdd.emit(category);
      });

  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
