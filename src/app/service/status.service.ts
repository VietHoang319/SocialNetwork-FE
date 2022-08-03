import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Status} from "../model/status";

const API_URL = 'http://localhost:8080/statuses'
@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private httpClien: HttpClient) { }

  findAll(): Observable<any> {
    return this.httpClien.get(API_URL);
  };
  save(status: any): Observable<any>{
    return this.httpClien.post(API_URL , status);
  };
  getById(id: string):Observable<Status>{
    return this.httpClien.get<Status>(API_URL+`/${id}`);
  }
}