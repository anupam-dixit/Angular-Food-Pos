import { Component } from '@angular/core';
import {Endpoints} from "../../../../../Helpers/Endpoints";
import {MyLib} from "../../../../../Helpers/MyLib";
import {Router} from "@angular/router";
declare var $: any;
declare var Swal: any;
@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {
  constructor(public router:Router) {
  }
  loading_add_categ: boolean=false;

  create() {
    var fileInput = document.getElementById('fileUpload');
    // @ts-ignore
    var title=document.getElementById('title').value;
    // @ts-ignore
    var file = fileInput.files[0];
    if (!file){
      MyLib.Sound.play(0)
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Missing Field',
        text:'File is required',
        showConfirmButton: false,
        timer: 1500
      })
      return
    }
    MyLib.Loader.on()
    this.loading_add_categ=true;
    const requestOptions = {
      method: 'POST', // GET/POST
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title: title})
    };
    fetch(Endpoints.Category.Create, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (!data.status){
          MyLib.Sound.play(0)
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          var formData = new FormData();
          formData.append('files', file);
          formData.append('reference', 'category_image');
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
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: data.message,
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              context.router.navigateByUrl('panel/category/list')
            })
          });

          xhr.open('POST', Endpoints.File.Upload, true);
          xhr.send(formData);
        }
        MyLib.Loader.off()
        this.loading_add_categ=false;
      });
  }
}
