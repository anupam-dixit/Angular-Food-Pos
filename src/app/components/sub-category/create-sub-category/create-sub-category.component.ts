import { Component } from '@angular/core';
import {Endpoints} from "../../../../../Helpers/Endpoints";
import {MyLib} from "../../../../../Helpers/MyLib";
import {FormControl, FormGroup} from "@angular/forms";
import {finalize, Subscription} from "rxjs";
import {HttpClient, HttpEventType} from "@angular/common/http";
import {Router} from "@angular/router";
declare var $:any
@Component({
  selector: 'app-create-sub-category',
  templateUrl: './create-sub-category.component.html',
  styleUrls: ['./create-sub-category.component.css']
})

export class CreateSubCategoryComponent {
  selectedFile: File | null = null;
  constructor(private http: HttpClient,public router:Router) {}
  loading_add_sub_categ: Boolean=false;
  protected categories: any={};
  protected myForm = new FormGroup({
    category_id: new FormControl(''),
    title: new FormControl(''),
    created_by: new FormControl(MyLib.User.data().id.toString()),
  });
  ngOnInit() {
    const requestOptions = {
      method: 'POST', // GET/POST
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    };
    fetch(Endpoints.Category.List, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (!data.status){
          this.loading_add_sub_categ=false
          return MyLib.Notification.show('warning','Message',data.response.message)
        }
        this.categories=data.data
      }).then(()=>{
      setTimeout(function () {
        $('.mdb-select.init').materialSelect();
      },500)
    })
  }
  create(){
    var fileInput = document.getElementById('fileUpload');
    // @ts-ignore
    var title=document.getElementById('title').value;
    // @ts-ignore
    var file = fileInput.files[0];
    if (!file){
      this.loading_add_sub_categ=false
      return MyLib.Notification.show('warning','Warning','File is required')
    }
    this.loading_add_sub_categ=true;
    const requestOptions = {
      method: 'POST', // GET/POST
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.myForm.value)
    };
    fetch(Endpoints.SubCategory.Create, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (!data.status){
          MyLib.Sound.play(0)
          this.loading_add_sub_categ=false
          return MyLib.Notification.show('warning','Warning',data.message)
        } else {
          var formData = new FormData();
          formData.append('files', file);
          formData.append('reference', 'subcategory_image');
          formData.append('reference_code', data.data[0].id);

          var xhr = new XMLHttpRequest();

          xhr.upload.addEventListener('progress', function (event) {
            if (event.lengthComputable) {
              let progress = Math.round((event.loaded / event.total) * 100);
              $('#progressBar').css('width', progress+'%')
              $('#progressBar').attr('aria-valuenow', progress)
              $('#progressBar').text(progress+'%')
            }
          });
          let context=this
          xhr.addEventListener('load', function (event) {
            MyLib.Notification.show('success','Message',data.message)
          });

          xhr.open('POST', Endpoints.File.Upload, true);
          xhr.send(formData);
        }
        this.loading_add_sub_categ=false;
      });
  }

  protected readonly Object = Object;

  private reset() {

  }
}
