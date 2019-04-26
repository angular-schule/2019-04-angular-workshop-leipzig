import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription, Subject } from 'rxjs';
import { map, filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'br-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'Book Rating';

  private destroy$ = new Subject();

  myInterval$: Observable<number>;

  ngOnDestroy() {
    this.destroy$.next();
  }

  constructor() {

    this.myInterval$ = interval(1000).pipe(
      map(num => num * 3),
      filter(num => num % 2 === 0),
      // takeUntil(this.destroy$)
    );

    /*

    function producer(obs) {
      obs.next(1);

      setTimeout(() => {
        obs.next(2);
      }, 2000);

      obs.next(3);

      obs.complete();
    }


    const myObserver = {
      next: value => console.log(value),
      error: err => console.log('ERR', err),
      complete: () => console.log('COMPLETE'),
    };

    const myObservable = new Observable(producer);
    */
  }
}
