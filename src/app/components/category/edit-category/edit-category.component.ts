import {Component, OnInit} from '@angular/core';
import {Endpoints} from "../../../../../Helpers/Endpoints";
import {MyLib} from "../../../../../Helpers/MyLib";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../services/category/category.service";
declare var {Swal,$}:any

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent {
  public data: any;
  constructor(public router:Router,public route:ActivatedRoute,protected categService:CategoryService) {
  }
  ngOnInit() {
    this.loadData();
  }

  loading_upd_categ: boolean=false;

  update() {
    var fileInput = document.getElementById('fileUpload');
    // @ts-ignore
    var title=this.field_title

    this.loading_upd_categ=true;
    const requestOptions = {
      method: 'POST', // GET/POST
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id:this.route.snapshot.paramMap.get('id'),title: title})
    };
    fetch(Endpoints.Category.Update, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (!data.status){
          MyLib.Notification.show('warning','Message',data.message)
        }
        else {
          // @ts-ignore
          var file = fileInput.files[0];
          if (file){
            var formData = new FormData();
            formData.append('files', file);
            formData.append('id', this.data.file_id);

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
          MyLib.Notification.show('success','Message',data.message)
          this.loading_upd_categ=false;
        }

      });
  }

  private loadData() {
    this.categService.index({'id':this.route.snapshot.paramMap.get('id')}).subscribe(
      (response) => {
        this.field_title=response.data[0].title;
        this.data=response.data[0]
      },
      (error) => {
        MyLib.Sound.play(0)
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error Occurred',
          text:error.toString(),
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  protected readonly JSON = JSON;
  field_title: any;
  protected readonly Endpoints = Endpoints;
}
