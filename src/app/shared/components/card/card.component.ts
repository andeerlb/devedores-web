import { Component, Input, OnInit } from '@angular/core'; 
import { CustomDatatableListener } from '../../services/custom-datatable-listener.service';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() cardTitle: any;
  @Input() navigate: Function;
  @Input() titleNavigate: string;
  @Input() backButton: boolean;
  @Input() emptyCardContent: boolean;
  @Input() sync: Function;

  constructor(private _datatableListener: CustomDatatableListener){
  }

  ngOnInit(): void {
  }

  public executeSync(){
    this.sync().then(() => {
      this._datatableListener.changeMessage("synchronized");
    });
  }
}
