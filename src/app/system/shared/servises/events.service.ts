import { BaseApi } from "../../../shared/core/base-api";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { TIMEvent } from "../models/event.model";
import { Injectable } from "@angular/core";

@Injectable()

export class EventsService extends BaseApi {
    constructor(public http: Http) {
        super(http);
    }

    addEvent(event: TIMEvent): Observable<TIMEvent> {
        return this.post('events', event)
    }

    getEvents(): Observable<TIMEvent[]> {
        return this.get('events');
    }
}