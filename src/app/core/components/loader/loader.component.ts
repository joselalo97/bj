import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderStateModel } from '@core/models';
import { AuthService } from '@auth/services';
import { Subscription, timer } from 'rxjs';
import { debounce, takeWhile } from 'rxjs/operators'


@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  constructor(
    private readonly authService: AuthService
  ) { }


  public show: boolean = false;
  private subscription!: Subscription;


  public ngOnInit(): void {

    this.subscribeLoader();

  }

  private subscribeLoader(): void {

    this.subscription = this.authService.loaderState
      .pipe(
        debounce( () => timer( 200 ) ),
        takeWhile( res => res.show <= true )
      ).subscribe(
        ( state: LoaderStateModel ) => (
          this.show = state.show
        )
      );

  }

  public ngOnDestroy(): void {

    this.subscription.unsubscribe();

  }

}
