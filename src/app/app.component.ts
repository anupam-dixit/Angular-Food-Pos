import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {MyLib} from "../../Helpers/MyLib";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(protected route: Router) { }
  title = 'food-pos';
  protected readonly MyLib = MyLib;
}
