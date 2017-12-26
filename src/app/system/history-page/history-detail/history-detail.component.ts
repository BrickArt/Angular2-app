import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { EventsService } from '../../shared/servises/events.service';
import { CategoriesService } from '../../shared/servises/categories.service';
import { TIMEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'tim-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.sass']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event: TIMEvent;
  category: Category;

  isLoaded = false;
  s1: Subscription;

  constructor(private route: ActivatedRoute,
              private eventService: EventsService,
              private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.s1 = this.route.params
      .mergeMap((params: Params) => this.eventService.getEventById(params['id']))
      .mergeMap((event: TIMEvent) => {
        this.event = event;
        console.log(event)
        return this.categoriesService.getCategoryById(event.category);
      })
      .subscribe((category: Category) => {
        this.category = category;
        this.isLoaded = true;
      })
  }

  ngOnDestroy() {
    if (this.s1) this.s1.unsubscribe();
  }

}
