import { Component, OnInit } from '@angular/core';
import { UserListFilter } from './state';
import { UserListUsecase } from './service/user-list.usecase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  users = this.userList.users$; // asObservableがuserListのusers$の更新を通知してくれる
  userListFilter$ = this.userList.filter$;

  constructor(private userList: UserListUsecase) { }

  ngOnInit() {
    this.userList.fetchUsers(); // コンポーネント生成時発火
  }

  setUserListFilter(value: UserListFilter) {
    this.userList.setNameFilter(value.nameFilter);
  }

}
