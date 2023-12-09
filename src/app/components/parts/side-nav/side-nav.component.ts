import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Env} from "../../../../../Helpers/Env";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  constructor(public router: Router) {
  }

  protected readonly Env = Env;
}
