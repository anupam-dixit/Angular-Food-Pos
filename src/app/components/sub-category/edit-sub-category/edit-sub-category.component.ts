import { Component } from '@angular/core';
import {SubCategoryService} from "../../../services/sub-category/sub-category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../services/category/category.service";
import {MyLib} from "../../../../../Helpers/MyLib";
import {Endpoints} from "../../../../../Helpers/Endpoints";
declare var $:any
@Component({
  selector: 'app-edit-sub-category',
  templateUrl: './edit-sub-category.component.html',
  styleUrls: ['./edit-sub-category.component.css']
})
export class EditSubCategoryComponent {
  constructor(
    protected subCategoryService:SubCategoryService,
    protected categoryService:CategoryService,
    protected router: ActivatedRoute,
  ) {}
  public loading_upd_sub_categ: boolean=false;
  protected categories: any;
  protected subCategory: any;
  protected id:string|null=null
  ngOnInit(){
    this.router.paramMap.subscribe(d=>{
      this.id=d.get('id')
    })
    this.categoryService.index({}).subscribe(d=>{
      this.categories=d.data
    })
    this.subCategoryService.index({id:this.id}).subscribe(d=>{
      this.subCategory=d.data[0]
      this.field_title=this.subCategory.title
      $("#field_title").val(this.field_title).change()
      this.sel_category=this.subCategory.category_id
      $("#sel_category").val(this.sel_category).change()
    })
    let ctx=this
    setTimeout(function () {
      $('.mdb-select.init').materialSelect();
    },100)
  }

  update() {
    this.loading_upd_sub_categ=true

    var fileInput = document.getElementById('fileUpload');
    // @ts-ignore
    var file = fileInput.files[0];

    var formData={
      id: this.id,
      title:this.field_title,
      category_id:this.sel_category
    }
    this.subCategoryService.update(formData).subscribe(d => {
      MyLib.Notification.show((d.status)?'success':'warning','Message',d.message)
      if (d.status){
        if (file){
          var formData = new FormData();
          formData.append('files', file);
          formData.append('id', this.subCategory.file_id);

          var xhr = new XMLHttpRequest();

          xhr.upload.addEventListener('progress', function (event) {
            if (event.lengthComputable) {
              let progress = Math.round((event.loaded / event.total) * 100);
              $('#progressBar').css('width', progress+'%')
              $('#progressBar').attr('aria-valuenow', progress)
              $('#progressBar').text(progress+'%')
            }

          });
          xhr.addEventListener('load', function (event) {
            // var uploadStatus = document.getElementById('uploadStatus');
            // // @ts-ignore
            // uploadStatus.innerHTML = event.target.responseText;

          });

          xhr.open('POST', Endpoints.File.UpdateById, true);
          xhr.send(formData);
        }
      }
      this.loading_upd_sub_categ=false
    })
  }

  protected readonly Object = Object;
  sel_category: any;
  field_title: any;

}
