import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {
  constructor(protected router:Router){}

}
