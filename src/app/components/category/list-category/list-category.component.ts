import {AfterViewInit, Component} from '@angular/core';
import {Router} from "@angular/router";
import {Endpoints} from "../../../../../Helpers/Endpoints";
import {MyLib} from "../../../../../Helpers/MyLib";
declare var $:any
declare var Swal:any
@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements AfterViewInit {
  loading_delete_category: boolean=false;
  dt:any
  private target_id: String='';
  constructor(public router:Router) {
  }
  ngAfterViewInit(): void {
    this.dt=$('#myDataTable').DataTable({
      serverSide: true,
      processing: true,
      ajax: Endpoints.Category.Dtlist,
      columns: [
        { data: 'title' },
        { data: 'code' },
        {
          data: 'created_at',
          title: 'Created At',
          render: function (data:any, type:any, row:any) {
            return new Date(data).toLocaleDateString('en-IN');
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
          this.router.navigateByUrl('panel/category/edit/'+$(event.target).parent().attr("target"))
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
      MyLib.Sound.play(0)
      Swal.fire({
        position: 'center',
        icon: 'error',
        title:'Invalid Target ID',
        showConfirmButton: false,
        timer: 1500
      })
      return
    }
    this.loading_delete_category=true
    const requestOptions = {
      method: 'DELETE', // GET/POST
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({title: title})
    };
    fetch(Endpoints.Category.Delete+'/'+this.target_id, requestOptions)
      .then(response => response.json())
      .then(data => {
        Swal.fire({
          position: 'center',
          icon: (data.status)?'success':'warning',
          title: data.response,
          showConfirmButton: false,
          timer: 1500
        })
        MyLib.Loader.off()
        this.loading_delete_category=false;
        $('#modalConfirmDelete').modal('hide')
        this.dt.ajax.reload();
      });
  }
}
