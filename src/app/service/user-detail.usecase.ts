import { Injectable } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailUsecase {
  get user$() {
    return this.store.select(state => state.userDetail.user);
  }

  constructor(private userApi: UserApiService, private store: StoreService) { }

  async fetchUser(userId: string) {
    this.store.update(state => ({
      ...state,
      userDetail: {
        ...state.userDetail,
        user: null
      }
    }));

    const user = await this.userApi.getUserById(userId);

    setTimeout(() => {
      this.store.update(state => ({
        ...state,
        userDetail: {
          ...state.userDetail,
          user
        }
      }));
    }, 500);
  }
}
