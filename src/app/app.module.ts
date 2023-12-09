import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './components/parts/side-nav/side-nav.component';
import { TopNavComponent } from './components/parts/top-nav/top-nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CategoryComponent } from './components/category/category.component';
import { CreateCategoryComponent } from './components/category/create-category/create-category.component';
import { ListCategoryComponent } from './components/category/list-category/list-category.component';
import {HttpClientModule} from "@angular/common/http";
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { SubCategoryComponent } from './components/sub-category/sub-category/sub-category.component';
import { ListSubCategoryComponent } from './components/sub-category/list-sub-category/list-sub-category.component';
import { CreateSubCategoryComponent } from './components/sub-category/create-sub-category/create-sub-category.component';
import { EditSubCategoryComponent } from './components/sub-category/edit-sub-category/edit-sub-category.component';
import { AccessManagementComponent } from './components/access-management/access-management.component';
import { CreateRoleComponent } from './components/access-management/role/create-role/create-role.component';
import { UpdateRoleComponent } from './components/access-management/role/update-role/update-role.component';
import { ListRoleComponent } from './components/access-management/role/list-role/list-role.component';
import { RoleComponent } from './components/access-management/role/role/role.component';
import { ListPermissionComponent } from './components/access-management/permission/list-permission/list-permission.component';
import { PermissionComponent } from './components/access-management/permission/permission.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    TopNavComponent,
    DashboardComponent,
    NotFoundComponent,
    LoginComponent,
    CategoryComponent,
    CreateCategoryComponent,
    ListCategoryComponent,
    EditCategoryComponent,
    SubCategoryComponent,
    ListSubCategoryComponent,
    CreateSubCategoryComponent,
    EditSubCategoryComponent,
    AccessManagementComponent,
    CreateRoleComponent,
    UpdateRoleComponent,
    ListRoleComponent,
    RoleComponent,
    ListPermissionComponent,
    PermissionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
