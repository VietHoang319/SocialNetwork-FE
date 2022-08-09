import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = 'http://localhost:8080/like-statuses'
@Injectable({
  providedIn: 'root'
})
export class LikeStatusService {

  constructor(private http : HttpClient) { }


  findByStatusIdAndUserId(statusId : any,userId : any): Observable<any> {
    return this.http.get(API_URL+`/check?idStatus=${statusId}&idUser=${userId}`);
  };
}
