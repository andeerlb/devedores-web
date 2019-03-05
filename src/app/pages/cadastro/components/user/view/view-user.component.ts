import { Component } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { CustomDataTable } from '../../../../../shared/components/custom-data-table/custom-data-table.interface';
import { Observable } from 'rxjs';
import { CustomDataTableColumn } from '../../../../../shared/models/custom-data-table-column.model';
import { UserService } from '../user.service';
import { User } from '../../../../../shared/models/user-model';

@Component({
  templateUrl: './view-user.component.html',
  styleUrls: ['./../user.component.scss'],
  providers: [UserService]
})
export class ViewUserComponent implements CustomDataTable {

  displayedColumns: CustomDataTableColumn[] = [
    new CustomDataTableColumn("name", "nome"),
    new CustomDataTableColumn("username", "usuario"),
    new CustomDataTableColumn("email", "e-mail"),
    new CustomDataTableColumn("phone", "telefone")
  ];
  
  constructor(private router: Router, 
              private route: ActivatedRoute,
              private _service: UserService) {
  }

  getAll(): Observable<any> {
    return this._service.getAll();
  }

  create(){
    this.router.navigate(['./create'], {relativeTo: this.route});
  }

  delete(entity: any) {
    return this._service.delete(entity);
  }

  importFromJsonPlaceholderAPI(): Promise<Boolean>{
    return this._service.importFromJsonPlaceholderAPI().toPromise()
                  .then((list: User[]) => {
                    list.forEach(element => delete element.id);
                    return this._service.saveImportFromJsonPlaceHolderAPI(list).toPromise()
                          .then(response => {
                            console.log(response);
                            return Promise.resolve(true);
                          })
                  })
  }
}
