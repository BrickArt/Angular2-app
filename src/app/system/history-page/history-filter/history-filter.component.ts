import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'tim-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.sass']
})
export class HistoryFilterComponent {

  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();

  @Input() categories: Category[] = [];
  
  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCategories = [];

  timePeriods = [
    {type: 'd', lable: 'День'},
    {type: 'w', lable: 'Неделя'},
    {type: 'M', lable: 'Месяц'}
  ];

  types = [
    {type: 'income', lable: 'Доход'},
    {type: 'outcome', lable: 'Расход'}
  ];

  closeFilter() {
    this.selectedTypes = [];
    this.selectedCategories = [];
    this.selectedPeriod = 'd';

    this.onFilterCancel.emit();
  }

  private calculateInputParams(field: string, checked: boolean, value: string) {
    if (checked) {
      this[field].indexOf(value) === -1 ? this[field].push(value) : null;
    } else {
      this[field] = this[field].filter(i => i !== value);
    }
  }
  
  handleChangeType({checked, value}) {
    this.calculateInputParams('selectedTypes', checked, value);
  }
  
  handleChangeCategory({checked, value}) {
    this.calculateInputParams('selectedCategories', checked, value);    
  }

  applyFilter() {
    this.onFilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }

}
