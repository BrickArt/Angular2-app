import { Component, OnInit, Input } from '@angular/core';

import { Category } from '../../shared/models/category.model';
import { TIMEvent } from '../../shared/models/event.model';

@Component({
  selector: 'tim-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.sass']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() events: TIMEvent[] = [];
  searchValue = '';
  searchPlaseholder = 'Сумма';
  searchField = 'amount';


  constructor() { }

  ngOnInit() {
    this.events.forEach((e) => {
      e.catName = this.categories.find(c => c.id === e.category).name;
    })
  }

  getEventClass(e) {
    return {
      'label': true,
      'label-danger': e.type === 'outcome',
      'label-success': e.type === 'income'
    }
  }

  changeCriteria(field: string) {
    const namesMap = {
      amount: 'Сумма',
      date: 'Дата',
      category: 'Категория',
      type: 'Тип'
    };
    this.searchPlaseholder = namesMap[field];
    this.searchField = field;

  }

}
