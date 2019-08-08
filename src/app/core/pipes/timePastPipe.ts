import {Pipe, PipeTransform} from '@angular/core';
import {Call} from '../call';

@Pipe({ name: 'timePastPipe' })
export class TimePastPipe implements PipeTransform {

  transform(entity: Call) {
    console.log('entity', entity.callerNumber);
    console.log('( )', Date.now() , entity.startStatusTime);
    console.log('(Date.now() - startTime)', (Date.now() - entity.startStatusTime));
    console.log('(Date.)', new Date(Date.now()), new Date(entity.startStatusTime));
    return Math.floor((Date.now() - entity.startStatusTime) / 1000) + ' sec';
  }

}
