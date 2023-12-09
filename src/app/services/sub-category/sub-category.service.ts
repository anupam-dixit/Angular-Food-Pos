import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpHeaders} from "@capacitor/core";
import {MyLib} from "../../../../Helpers/MyLib";
import {Endpoints} from "../../../../Helpers/Endpoints";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  private headers: HttpHeaders
  constructor(private http:HttpClient) {
    this.headers={
      'token':MyLib.User.data().token
    }
  }

  index(formData:any):Observable<any>{
    return this.http.post(Endpoints.SubCategory.List, formData, { headers: this.headers });
  }
  update(formData:any):Observable<any>{
    return this.http.post(Endpoints.SubCategory.Update, formData, { headers: this.headers });
  }
}
