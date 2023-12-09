import { Component } from '@angular/core';
import {Env} from "../../../../../Helpers/Env";
import {MyLib} from "../../../../../Helpers/MyLib";

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {

    protected readonly localStorage = localStorage;
  protected readonly Env = Env;
  protected readonly MyLib = MyLib;
}
