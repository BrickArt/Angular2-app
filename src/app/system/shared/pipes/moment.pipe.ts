
import { Pipe, PipeTransform } from "@angular/core";
import * as moment from 'moment';

@Pipe({
    name: 'timMoment'
})
export class MomentPipe implements PipeTransform {
    transform(value: string, formatForm: string, formatTo: string = 'DD.MM.YYYY'): string {
        return moment(value, formatForm).format(formatTo);
    }
}