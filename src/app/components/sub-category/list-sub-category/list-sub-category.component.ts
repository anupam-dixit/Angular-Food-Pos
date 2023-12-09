import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Endpoints} from "../../../../../Helpers/Endpoints";
import {MyLib} from "../../../../../Helpers/MyLib";
declare var $:any
@Component({
  selector: 'app-list-sub-category',
  templateUrl: './list-sub-category.component.html',
  styleUrls: ['./list-sub-category.component.css']
})
export class ListSubCategoryComponent {
  loading_delete_subcategory: Boolean=false;
  dt:any
  private target_id: String='';
  constructor(public router:Router) {
  }
  ngAfterViewInit(): void {
    this.dt=$('#myDataTable').DataTable({
      serverSide: true,
      processing: true,
      ajax: Endpoints.SubCategory.Dtlist,
      columns: [
        { data: 'title' },
        { data: 'category_title' },
        {
          data: 'file_path',
          title: 'Image',
          render: function (data:any, type:any, row:any) {
            return `<img class="rounded" style="height: 45px;width: auto;" src="${Endpoints.ENDPOINT+row.file_path.replaceAll('public','')}">`
          },
        },
        {
          data: 'id',
          title: 'Action',
          render: function (data:any, type:any, row:any) {
            return `
                <a action="ref" target="${data}" class="btn-floating btn-sm btn-warning"><i class="fas fa-pencil"></i></a>
                <a action="del" target="${data}" class="btn-floating btn-sm btn-danger"><i class="fas fa-trash"></i></a>`
          },
        }
      ]
    });
  }

  ngOnInit(): void {
    $(document).on("click", (event:any) => {
      switch ($(event.target).parent().attr("action")) {
        case "ref":
          this.router.navigateByUrl('panel/sub-category/edit/'+$(event.target).parent().attr("target"))
          break
        case "del":
          this.target_id = $(event.target).parent().attr("target")
          this.confDelete()
          break
      }
    });
    let context=this
    $("#modalConfirmDelete").on('hide.bs.modal', function(){
      // Unset target id on modal hide
      context.target_id=''
    });
  }

  private confDelete() {
    $("#modalConfirmDelete").modal('show')
  }

  delete() {
    if (this.target_id.length===0){
      return MyLib.Notification.show('error', 'Message','Invalid Target ID')
    }
    this.loading_delete_subcategory=true
    const requestOptions = {
      method: 'DELETE', // GET/POST
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({title: title})
    };
    fetch(Endpoints.SubCategory.Delete+'/'+this.target_id, requestOptions)
      .then(response => response.json())
      .then(data => {
        MyLib.Notification.show((data.status)?'success':'warning', 'Message',data.response)
        this.loading_delete_subcategory=false
        $('#modalConfirmDelete').modal('hide')
        this.dt.ajax.reload();
      });
  }
}
