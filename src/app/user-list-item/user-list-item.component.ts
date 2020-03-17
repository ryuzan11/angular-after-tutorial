import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // ChengeDetectionの制御
})
export class UserListItemComponent  {

  constructor() { }

  @Input() // 親要素からデータを受け取る
  user!: User; // Non-null assertion operator。この変数はundefinedやnullになることはない。

}
