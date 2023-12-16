import { Injectable } from '@angular/core';
import {HttpHeaders} from "@capacitor/core";
import {HttpClient} from "@angular/common/http";
import {MyLib} from "../../../../Helpers/MyLib";
import {Observable} from "rxjs";
import {Endpoints} from "../../../../Helpers/Endpoints";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private headers: HttpHeaders
  constructor(private http:HttpClient) {
    this.headers={
      'token':MyLib.User.data().token
    }
  }

  index(formData:any):Observable<any>{
    return this.http.post(Endpoints.Category.List, formData, { headers: this.headers });
  }
}
