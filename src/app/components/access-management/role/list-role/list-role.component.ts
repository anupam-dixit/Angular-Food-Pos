import { Component } from '@angular/core';
import {Endpoints} from "../../../../../../Helpers/Endpoints";
import {Router} from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css']
})
export class ListRoleComponent {
  loading_delete_permission: boolean=false;
  dt:any
  private target_id: String='';
  constructor(public router:Router) {
  }
  ngAfterViewInit(): void {
    this.dt=$('#myDataTable').DataTable({
      serverSide: true,
      processing: true,
      ajax: Endpoints.Role.Dtlist,
      columns: [
        { data: 'title' },
        { data: 'code' },
        { data: 'description' },
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
          break
      }
    });
    let context=this
    $("#modalConfirmDelete").on('hide.bs.modal', function(){
      // Unset target id on modal hide
      context.target_id=''
    });
  }


}
