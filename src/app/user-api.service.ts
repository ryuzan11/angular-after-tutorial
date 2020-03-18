import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

const apiHost = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) { }

  async getAllUsers() {
    return await this.http.get<User[]>(`${apiHost}/users`).toPromise();
    // await Promise処理 →Promise処理結果が返ってくるまで一時停止する演算子。asyncで定義された関数の中でだけ使える
  }

  async getUserById(id: string) {
    return await this.http.get<User>(`${apiHost}/users/${id}`).toPromise();
  }
}
