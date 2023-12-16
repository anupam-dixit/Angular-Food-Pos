import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {PermissionService} from "../../../../services/permission/permission.service";
import {RoleService} from "../../../../services/role/role.service";
import {MyLib} from "../../../../../../Helpers/MyLib";
import {Router} from "@angular/router";
declare var $: any;
@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent {
  constructor(protected permissionService: PermissionService,protected roleService: RoleService,protected router:Router) {
  }
  loading_add_data: Boolean = false;
  createForm=new FormGroup({
    title:new FormControl(),
    description:new FormControl(''),
  })
  ngAfterViewInit() {
    setTimeout(function () {
      $('.mdb-select.init').materialSelect();
    },500)
  }

  create() {
    this.loading_add_data=true;
    this.roleService.create(this.createForm.value).subscribe(d=>{
      MyLib.Notification.show((d.status)?'success':'warning',null,d.message);
      this.loading_add_data=false
      if (d.status){
        this.router.navigateByUrl('panel/access-management/role/list')
      }
    })

  }
}
