import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CustomDataTableColumn } from '../../models/custom-data-table-column.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CadastroService } from '../../../pages/cadastro/cadastro.service';
import { CustomDatatableListener } from '../../services/custom-datatable-listener.service';

@Component({
  selector: 'app-custom-data-table',
  templateUrl: './custom-data-table.component.html',
  styleUrls: ['./custom-data-table.component.scss'],
  providers: [CadastroService]
})
export class CustomDataTableComponent implements OnInit, OnDestroy {

  @Input()
  displayedColumns: CustomDataTableColumn[];

  @Input()
  private getAll: Function;

  @Input()
  private delete: Function;

  private onlyDisplayColumnsName: string[];
  rows: any[];
  showDataTable: boolean = false;

  constructor(private _router: Router, 
              private _cadastroService: CadastroService, 
              private _route: ActivatedRoute,
              private _listener: CustomDatatableListener
              ) { }

  ngOnInit() {
    this._listener.getObservable()
                .subscribe(value => {
                  console.log(value);
                  this.dataTableGetAll();
                })
    this.onlyDisplayColumnsName = this.displayedColumns.map((column: CustomDataTableColumn) => column.name);
  }

  ngOnDestroy(): void {
    this.showDataTable = false;
  }

  private dataTableGetAll(): void {
    this.showDataTable = true;
    this.getAll().subscribe(
      value => {
        this.rows = value;
      }
    );
  }

  public dataTableEdit(row) {
    this._router.navigate(['./edit', row.id], { relativeTo: this._route });
  }

  public dataTableDelete(row, index) {
    this._cadastroService.deleteConfirm(this.delete(row))
      .then(value => {
        this.rows.splice(index, 1);
      }).catch((e) => console.error(e));
  }

  public checkPropertyExistsOnArrayColumns(row: object): string[] {
    let keysObject = Object.keys(row)
      .filter(keyName => this.onlyDisplayColumnsName.includes(keyName));

    let keysPrototype = this.onlyDisplayColumnsName.filter(key => !keysObject.includes(key));
    keysPrototype.forEach(key => row[key] = "");

    return keysObject.map(key => row[key]);
  }

  public formatForCorrectlyForm(row: any): any{
    let tempDate = null;
    let tempCheckIsNaN = null;
    
    if(typeof row == "string"){
      tempDate = Date.parse(row as string);
      tempCheckIsNaN = Number.isNaN(tempDate);
    }
    
    return tempCheckIsNaN == null || tempCheckIsNaN == true ? row : new Date(tempDate).toLocaleDateString();
  }
}
