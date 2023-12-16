import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Endpoints} from "../../../../../Helpers/Endpoints";
import {MyLib} from "../../../../../Helpers/MyLib";
declare var $: any;
@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent {
  loading_delete_permission: boolean=false;
  dt:any
  private target_id: String='';
  constructor(public router:Router) {
  }
  ngAfterViewInit(): void {
    this.dt=$('#myDataTable').DataTable({
      serverSide: true,
      processing: true,
      ajax: Endpoints.Permission.Dtlist,
      columns: [
        { data: 'title' },
        { data: 'code' },
        { data: 'description' },
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
