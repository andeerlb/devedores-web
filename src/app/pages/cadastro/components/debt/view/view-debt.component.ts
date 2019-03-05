import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { CustomDataTable } from '../../../../../shared/components/custom-data-table/custom-data-table.interface';
import { Observable } from 'rxjs';
import { CustomDataTableColumn } from '../../../../../shared/models/custom-data-table-column.model';
import { DebtService } from '../debt.service';
import { User } from '../../../../../shared/models/user-model';
import { UserService } from '../../user/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomDatatableListener } from '../../../../../shared/services/custom-datatable-listener.service';

@Component({
  templateUrl: './view-debt.component.html',
  styleUrls: ['./../debt.component.scss'],
  providers: [DebtService, UserService, CustomDatatableListener]
})
export class ViewDebtComponent implements OnInit, CustomDataTable {

  users: User[] = [];
  filterForm: FormGroup;
  displayedColumns: CustomDataTableColumn[] = [
    new CustomDataTableColumn("name", "Usuário"),
    new CustomDataTableColumn("reason", "Motivo"),
    new CustomDataTableColumn("value", "Valor"),
    new CustomDataTableColumn("startDate", "Data")
  ];
  
  constructor(private router: Router, 
              private route: ActivatedRoute,
              private _service: DebtService,
              private _userService: UserService,
              private formBuilder: FormBuilder,
              private _datatableListener: CustomDatatableListener) {
  }

  ngOnInit(){
    this.filterForm = this.formBuilder.group({
      userId: [undefined],
      startDate: [{value: undefined, disabled: true}],
      onlyDebt: [true]
    });
    
    this.listOfUsers();
  }

  private listOfUsers(): void {
    this._userService.getAllByFilter(this.filterForm.getRawValue()).subscribe((users: any) => this.users = users);;
  }

  getAll(): Observable<any> {
    return this._service.getAllByFilter(this.filterForm.getRawValue());
  }

  create(){
    this.router.navigate(['./create'], {relativeTo: this.route});
  }

  delete(entity: any) {
    return this._service.delete(entity);
  }

  clearFilters(){
    if(this.users.length === 0){
      return;
    }
    this.filterForm.reset();
    this._datatableListener.changeMessage("clearFilters");
  }

  onSubmitFilters(){
    if(this.users.length === 0){
      return;
    }
    this._datatableListener.changeMessage("update by filter");
  }
}
