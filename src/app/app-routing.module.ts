import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {ensureLoggedInGuard} from "./Guards/ensure-logged-in.guard";
import {LoginComponent} from "./components/login/login.component";
import {ensureNotLoggedInGuard} from "./Guards/ensure-not-logged-in.guard";
import {CategoryComponent} from "./components/category/category.component";
import {CreateCategoryComponent} from "./components/category/create-category/create-category.component";
import {ListCategoryComponent} from "./components/category/list-category/list-category.component";
import {EditCategoryComponent} from "./components/category/edit-category/edit-category.component";
import {SubCategoryComponent} from "./components/sub-category/sub-category/sub-category.component";
import {ListSubCategoryComponent} from "./components/sub-category/list-sub-category/list-sub-category.component";
import {CreateSubCategoryComponent} from "./components/sub-category/create-sub-category/create-sub-category.component";
import {EditSubCategoryComponent} from "./components/sub-category/edit-sub-category/edit-sub-category.component";
import {AccessManagementComponent} from "./components/access-management/access-management.component";
import {CreateRoleComponent} from "./components/access-management/role/create-role/create-role.component";
import {UpdateRoleComponent} from "./components/access-management/role/update-role/update-role.component";
import {ListRoleComponent} from "./components/access-management/role/list-role/list-role.component";
import {PermissionComponent} from "./components/access-management/permission/permission.component";
import {ListPermissionComponent} from "./components/access-management/permission/list-permission/list-permission.component";
import {RoleComponent} from "./components/access-management/role/role.component";

const routes: Routes = [
  {path:"login",component:LoginComponent,canActivate:[ensureNotLoggedInGuard], title: 'Login',},

  {path:"panel/dashboard",component:DashboardComponent,canActivate:[ensureLoggedInGuard], title: 'Dashboard',},
  {
    path:"panel/category",component:CategoryComponent,canActivate:[ensureLoggedInGuard],
    children:[
      {path: 'list', component: ListCategoryComponent,title: 'Category List'},
      {path: 'create', component: CreateCategoryComponent,title: 'Category Create'},
      {path: 'edit/:id', component: EditCategoryComponent,title: 'Category Update'},
    ]
  },
  {
    path:"panel/sub-category",component:SubCategoryComponent,canActivate:[ensureLoggedInGuard],
    children:[
      {path: 'list', component: ListSubCategoryComponent,title: 'Sub Category List'},
      {path: 'create', component: CreateSubCategoryComponent,title: 'Sub Category Create'},
      {path: 'edit/:id', component: EditSubCategoryComponent,title: 'Sub Category Update'},
    ]
  },
  {
    path:"panel/access-management/role",component:RoleComponent,canActivate:[ensureLoggedInGuard],
    children:[
      {path: '', component: ListRoleComponent,title: 'Role List'},
      {path: 'list', component: ListRoleComponent,title: 'Role List'},
      {path: 'create', component: CreateRoleComponent,title: 'Role Create'},
      {path: 'edit/:id', component: UpdateRoleComponent,title: 'Role Update'},
    ],
    title:'Role'
  },
  {
    path:"panel/access-management/permission",component:PermissionComponent,canActivate:[ensureLoggedInGuard],
    children:[
      {path: 'list', component: ListPermissionComponent,title: 'Permission List'},
    ],
    title:'Permission'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
