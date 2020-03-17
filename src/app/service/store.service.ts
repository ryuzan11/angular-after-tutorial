import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { State, initialState } from '../state';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private _state$ = new BehaviorSubject<State>(initialState); // インスタンス生成時の引数に値の初期値もしくは最新値を設定できる。subscribeかNextで流す、

  update(fn: (state: State) => State) { // 関数を型指定。中の関数の引数の型とその戻り値の型を指定する必要がある。
    const current = this._state$.value;
    this._state$.next(fn(current));
  }

  select<T>(selector: (state: State) => T) { // 状態を購読する
    return this._state$.pipe(
      map(selector)
    );
  }

}
