import { Injectable } from '@angular/core';
import { RequestService } from '../../../../shared/services/request.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DebtService extends RequestService {

    constructor(http: HttpClient){
        super(http, "debts")
    }
    

    getAllByFilter(filters: any): Observable<any> {
        let parameters = new HttpParams();

        if(filters.userId){
            parameters = parameters.append('userId', filters.userId);
        }
        if(filters.startDate){
            parameters = parameters.append('startDate', filters.startDate);
        }
        if(filters.onlyDebt){
            parameters = parameters.append('onlyDebt', filters.startDate);
        }

        return this.http.get(`${this.url}/allByFilter`, {params: parameters}) as Observable<any>;
    }
}