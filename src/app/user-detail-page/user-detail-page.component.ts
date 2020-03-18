import { Component, OnDestroy, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { UserDetailUsecase } from '../service/user-detail.usecase';

@Component({
  // selector: 'app-user-detail-page',
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.scss']
})
export class UserDetailPageComponent implements OnInit, OnDestroy {
  user$ = this.userDetailUsecase.user$;
  private onDestroy$ = new EventEmitter(); // カスタムイベントを生成する。EventEmitterインスタンスのemitメソッド実行でイベント実行。

  constructor(private route: ActivatedRoute, private userDetailUsecase: UserDetailUsecase) { }

  ngOnInit() {
    this.route.params
      .pipe(
        takeUntil(this.onDestroy$),
        map(params => params['userId']),
        distinctUntilChanged()
      )
      .subscribe(userId => this.userDetailUsecase.fetchUser(userId));
  }

  ngOnDestroy() {
    this.onDestroy$.complete();
  }

}
