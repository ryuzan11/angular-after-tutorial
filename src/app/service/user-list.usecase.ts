import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreService } from './store.service';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserListUsecase {

  get users$() {
    return this.store.select(state =>
      state.userList.items.filter(user => user.name.includes(state.userListFilter.nameFilter))
    );
  }

  get filter$() {
    return this.store.select(state => state.userListFilter);
  }

  constructor(private http: HttpClient, private store: StoreService) { }

  async fetchUsers() { // userの配列をフェッチする。ngOnInitで発火。
    const users = await this.http // await Promise処理 →Promise処理結果が返ってくるまで一時停止する演算子。asyncで定義された関数の中でだけ使える
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .toPromise();

    this.store.update(state => ({
      ...state, /// spread operator 展開?反復?可能なオブジェクト(配列など)を文脈に合わせて拡張、全て展開してくれる
      userList: {
        ...state.userList,
        items: users,
      }
    }));
  }

  setNameFilter(nameFilter: string) {
    this.store.update(state => ({
      ...state,
      userListFilter: {
        nameFilter
      }
    }));
  }
}
