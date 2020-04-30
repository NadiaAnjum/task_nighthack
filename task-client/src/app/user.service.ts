import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  _g_user_email;

  private userDetailUrl = '/get_user/get_user_details';
  private allUsers = '/get_user/get_users';
  private postData = '/to_do_list';
  private getData = '/to_do_list/?all=all';
  private getMaxDate = '/to_do_list/?create_date=all';
  private getLatestData = '/to_do_list/?latest=';
  private putData = '/to_do_list/';
  private batchInsert = '/to_do_list/batch_update';

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) {
    this._g_user_email      = '';

  }

  setUserEmail(val: string){
    this._g_user_email = val;
  }

  getUserEmail(){
    return this._g_user_email;
  }

  getUserDetails(){
    return this.http.get(this.userDetailUrl);
  }

  getUsers(){
    return this.http.get(this.allUsers);
  }

  postNewData(param_data){
    return this.http.post(this.postData, param_data);
  }

  updateData(param_url, param_data){
    return this.http.put(this.putData + param_url, param_data);
  }

  postBatchData(param_data){
    return this.http.post(this.batchInsert, param_data);
  }

  /*getToDolist(){
    return this.http.get(this.getData);
  }*/

  getToDolist(): Observable<any[]> {
    return this.http.get<any[]>(this.getData)
      .pipe(
        tap(todolist => console.log('fetched list')),
        catchError(this.handleError('getToDolist', []))
      );
  }

  /*getLatestlist(param_val): Observable<any[]> {
    return this.http.get<any[]>(this.getLatestData + param_val)
      .pipe(
        tap(todolist => console.log('fetched latest list')),
        catchError(this.handleError('getLatestlist', []))
      );
  }*/

  getLatestlist(param_val){
    return this.http.get('/to_do_list/?latest=' + param_val);
  }

  getMaxmDate(): Observable<any[]> {
    return this.http.get<any[]>(this.getMaxDate)
      .pipe(
        tap(todolist => console.log('fetched Max Date')),
        catchError(this.handleError('getMaxmDate', []))
      );
  }to

}
