import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { User } from '../user';
import { UserApiService } from '../user-api.service';

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

  constructor(private userApi: UserApiService, private store: StoreService) { }

  async fetchUsers() { // userの配列をフェッチ(読み込む)する。ngOnInitで発火。
    const users = await this.userApi.getAllUsers();

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
